from py_mini_racer import py_mini_racer
from RestrictedPython import safe_builtins
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Level, Task, TestCase, CompletedTask
from .serializers import LevelSerializer, TaskSerializer, TestCaseSerializer
from language.models import Language


class LevelViewSet(viewsets.ModelViewSet):
    queryset = Level.objects.all().select_related('language', 'material').prefetch_related('tasks__testCases')
    serializer_class = LevelSerializer


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all().select_related('level', 'level__language')
    serializer_class = TaskSerializer


class TestCaseViewSet(viewsets.ModelViewSet):
    queryset = TestCase.objects.all().select_related('task', 'task__level', 'task__level__language')
    serializer_class = TestCaseSerializer


class CodeCheckerView(APIView):
    permission_classes = [IsAuthenticated]

    def setPassed(self, query, id, obj, dataStatus):
        queryset = [i.id for i in query]
        if queryset[-1] == id:
            self.responeData[dataStatus] = True
            obj.add(self.request.user)
            return True
        return False

    def post(self, request, format=None):
        data = request.data
        language = Language.objects.get(pk=data.get('language'))

        task = Task.objects.get(pk=data.get('task'))
        testCases = task.testCases.all()

        passedTestCasesNumber = 0
        self.responeData = {'level': task.level.id, 'text': task.text, 'testCases': [],
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
                self.responeData['testCases'].append(serializerData)
            except BaseException:
                return Response({'message': 'Bad code data'}, status=status.HTTP_400_BAD_REQUEST)

        if testCases.count() == passedTestCasesNumber:
            self.responeData['task_is_passed'] = True
            obj, created = CompletedTask.objects.get_or_create(task=task, level=task.level, user=request.user)

            if self.setPassed(task.level.tasks.all().order_by('number'), task.id, task.level.users, 'level_is_passed'):
                self.setPassed(language.levels.all().order_by('number'), task.level.id, language.users,
                               'language_is_passed')
        else:
            return Response({'message': 'Bad code result'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(self.responeData, status=status.HTTP_200_OK)
