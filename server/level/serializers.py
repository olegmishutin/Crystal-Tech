from rest_framework import serializers
from .models import Level, Task, TestCase
from material.models import Material
from material.serializers import MaterialSerializer


class TestCaseSerializer(serializers.ModelSerializer):
    language_name = serializers.SerializerMethodField(source='get_language_name')
    task = serializers.PrimaryKeyRelatedField(queryset=Task.objects.all(), required=False, read_only=False)

    class Meta:
        model = TestCase
        fields = ['id', 'code', 'text', 'language_name', 'task']

    def create(self, validated_data):
        if 'task' in validated_data:
            return super(TestCaseSerializer, self).create(validated_data)
        raise serializers.ValidationError({'task': ['This field is required.']})

    def get_language_name(self, obj):
        return obj.task.level.language.name


class TaskSerializer(serializers.ModelSerializer):
    language_name = serializers.SerializerMethodField(source='get_language_name')
    is_completed = serializers.SerializerMethodField(source='get_is_completed')
    testCases = TestCaseSerializer(many=True)

    class Meta:
        model = Task
        fields = ['id', 'number', 'text', 'time', 'language_name', 'level', 'is_completed', 'testCases']

    def get_is_completed(self, obj):
        user = self.context.get('request').user
        return obj.users.filter(id=user.id).exists()

    def get_language_name(self, obj):
        return obj.level.language.name

    def create(self, validated_data):
        testCasesData = validated_data.pop('testCases', [])
        task = Task.objects.create(**validated_data)

        for testCase in testCasesData:
            TestCase.objects.create(task=task, **testCase)
        return task


class LevelSerializer(serializers.ModelSerializer):
    language_name = serializers.SerializerMethodField(source='get_language_name')
    tasks = TaskSerializer(many=True, required=False)
    material = MaterialSerializer(required=False)
    image = serializers.ImageField()

    class Meta:
        model = Level
        fields = ['id', 'number', 'description', 'image', 'language', 'language_name', 'tasks', 'material']

    def get_language_name(self, obj):
        return obj.language.name
