from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from .models import Level, Task, TestCase
from .serializers import LevelSerializer, TaskSerializer, TestCaseSerializer
from language.models import Language
from .permission import TaskIsCanBePassed


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
