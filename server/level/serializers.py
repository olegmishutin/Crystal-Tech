from rest_framework import serializers
from .models import Level, Task, TestCase
from material.models import Material


class LevelSerializer(serializers.ModelSerializer):
    tasks = serializers.PrimaryKeyRelatedField(queryset=Task.objects.all(), many=True, required=False)
    material = serializers.PrimaryKeyRelatedField(queryset=Material.objects.all(), required=False)

    class Meta:
        model = Level
        fields = ['id', 'number', 'description', 'image', 'language', 'tasks', 'material']


class TestCaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestCase
        fields = '__all__'


class TaskSerializer(serializers.ModelSerializer):
    testCases = serializers.PrimaryKeyRelatedField(queryset=TestCase.objects.all(), many=True, required=False)

    class Meta:
        model = Task
        fields = ['id', 'number', 'text', 'level', 'testCases']