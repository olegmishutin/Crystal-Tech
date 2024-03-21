from rest_framework import serializers
from .models import Language
from level.models import Level
from level.serializers import LevelSerializer


class LanguageSerializer(serializers.ModelSerializer):
    levels = LevelSerializer(many=True, required=False)
    accepted_users = serializers.SerializerMethodField(source='get_accepted_users', required=False)
    image = serializers.ImageField()

    class Meta:
        model = Language
        fields = ['id', 'name', 'image', 'levels', 'is_closed', 'accepted_users']

    def get_accepted_users(self, obj):
        return [{'id': user.id, 'email': user.email} for user in obj.accepted_users.all()]
