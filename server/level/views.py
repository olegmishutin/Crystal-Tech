import js2py
from RestrictedPython import safe_builtins
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework import status
from .models import Level, Task, TestCase, CompletedTask
from .serializers import LevelSerializer, TaskSerializer, TestCaseSerializer
from language.models import Language
from .permissions import TaskIsCanBePassed


class AdminLevelsView(generics.ListCreateAPIView):
    queryset = Level.objects.all().order_by('-number')
    serializer_class = LevelSerializer
    permission_classes = [IsAdminUser]


class AdminLevelView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Level.objects.all()
    serializer_class = LevelSerializer
    permission_classes = [IsAdminUser]


class AdminTasksView(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAdminUser]


class AdminTaskView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAdminUser]


class AdminTestCasesView(generics.ListCreateAPIView):
    queryset = TestCase.objects.all()
    serializer_class = TestCaseSerializer
    permission_classes = [IsAdminUser]


class AdminTestCaseView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TestCase.objects.all()
    serializer_class = TestCaseSerializer
    permission_classes = [IsAdminUser]


class TaskView(generics.RetrieveAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated, TaskIsCanBePassed]


class LevelView(generics.RetrieveAPIView):
    queryset = Level.objects.all()
    serializer_class = LevelSerializer
    permission_classes = [IsAuthenticated]


class CodeCheckerView(APIView):
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
                    result = js2py.eval_js(code)

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
