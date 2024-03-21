from rest_framework import serializers
from .models import User


class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password', 'name']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class UserProfileSerializer(serializers.ModelSerializer):
    photo = serializers.ImageField()

    class Meta:
        model = User
        fields = ['email', 'name', 'age', 'photo', 'group']


class UserSerializer(serializers.ModelSerializer):
    completed_languages_count = serializers.SerializerMethodField(source='get_completed_languages_count')
    completed_levels_count = serializers.SerializerMethodField(source='get_completed_levels_count')
    completed_tasks_count = serializers.SerializerMethodField(source='get_completed_tasks_count')

    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'group', 'completed_languages_count', 'completed_levels_count',
                  'completed_tasks_count']

    def get_completed_languages_count(self, obj):
        return obj.completedLanguages.count()

    def get_completed_levels_count(self, obj):
        return obj.completedLevels.count()

    def get_completed_tasks_count(self, obj):
        return obj.completedTasks.count()
