from rest_framework import serializers
from .models import Level, Task, TestCase
from material.models import Material
from material.serializers import MaterialSerializer


class TestCaseSerializer(serializers.ModelSerializer):
    task = serializers.PrimaryKeyRelatedField(queryset=Task.objects.all(), required=False, read_only=False)

    class Meta:
        model = TestCase
        fields = ['id', 'code', 'text', 'task']

    def create(self, validated_data):
        if 'task' in validated_data:
            return super(TestCaseSerializer, self).create(validated_data)
        raise serializers.ValidationError({'task': ['This field is required.']})


class TaskSerializer(serializers.ModelSerializer):
    is_completed = serializers.SerializerMethodField(source='get_is_completed')
    testCases = TestCaseSerializer(many=True)

    class Meta:
        model = Task
        fields = ['id', 'number', 'text', 'time', 'level', 'is_completed', 'testCases']

    def get_is_completed(self, obj):
        user = self.context.get('request').user
        return obj.users.filter(id=user.id).exists()

    def create(self, validated_data):
        testCasesData = validated_data.pop('testCases', [])
        task = Task.objects.create(**validated_data)

        for testCase in testCasesData:
            TestCase.objects.create(task=task, **testCase)
        return task


class LevelSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, required=False)
    material = MaterialSerializer(required=False)
    image = serializers.ImageField()

    class Meta:
        model = Level
        fields = ['id', 'number', 'description', 'image', 'language', 'tasks', 'material']
