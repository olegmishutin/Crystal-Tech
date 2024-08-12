from py_mini_racer import py_mini_racer
from RestrictedPython import safe_builtins
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import get_object_or_404
from asgiref.sync import sync_to_async
from .models import Level, Task, TestCase, CompletedTask
from .serializers import LevelSerializer, TaskSerializer, TestCaseSerializer
from language.models import Language


class AdminLevelViewSet(viewsets.ModelViewSet):
    queryset = Level.objects.all().select_related('language', 'material').prefetch_related('tasks__testCases')
    serializer_class = LevelSerializer
    permission_classes = [IsAdminUser]


class AdminTaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all().select_related('level', 'level__language')
    serializer_class = TaskSerializer
    permission_classes = [IsAdminUser]


class AdminTestCaseViewSet(viewsets.ModelViewSet):
    queryset = TestCase.objects.all().select_related('task', 'task__level', 'task__level__language')
    serializer_class = TestCaseSerializer
    permission_classes = [IsAdminUser]


@sync_to_async()
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def check_code_view(self, request, format=None):
    def setPassed(self, query, id, obj, dataStatus):
        queryset = [i.id for i in query]
        if queryset[-1] == id:
            self.responseData[dataStatus] = True
            obj.add(self.request.user)
            return True
        return False

    data = request.data
    language = get_object_or_404(Language.objects.all(), pk=data.get('language'))

    task = get_object_or_404(Task.objects.all(), pk=data.get('task'))
    testCases = task.testCases.all()

    passedTestCasesNumber = 0
    self.responseData = {'level': task.level.id, 'text': task.text, 'testCases': [],
                         'level_is_passed': False, 'task_is_passed': False, 'language_is_passed': False}

    for testCase in testCases:
        testCaseCode = testCase.code
        code = f'{data.get("code")}\n{testCaseCode}'

        serializer = TestCaseSerializer(testCase)
        serializerData = serializer.data

        try:
            if language.name == 'js':
                jsCode = py_mini_racer.MiniRacer()
                jsCode.eval(code)
                result = jsCode.call('check_user_code')

            elif language.name == 'py':
                loc = {}
                restricted_globals = {}

                restricted_globals['__builtins__'] = safe_builtins
                restricted_globals['__name__'] = '__main__'

                byte_code = compile(code, '<string>', 'exec')
                exec(byte_code, restricted_globals, loc)

                for key, value in loc.items():
                    restricted_globals[key] = value

                exec(byte_code, restricted_globals, loc)
                result = loc['check_user_code']()

            if result:
                passedTestCasesNumber += 1

            serializerData.update({'is_passed': result})
            self.responseData['testCases'].append(serializerData)
        except BaseException:
            return Response({'message': 'Bad code data'}, status=status.HTTP_400_BAD_REQUEST)

    if testCases.count() == passedTestCasesNumber:
        self.responseData['task_is_passed'] = True
        obj, created = CompletedTask.objects.get_or_create(task=task, level=task.level, user=request.user)

        if self.setPassed(task.level.tasks.all().order_by('number'), task.id, task.level.users, 'level_is_passed'):
            self.setPassed(language.levels.all().order_by('number'), task.level.id, language.users,
                           'language_is_passed')
    else:
        return Response({'message': 'Bad code result'}, status=status.HTTP_400_BAD_REQUEST)
    return Response(self.responseData, status=status.HTTP_200_OK)
