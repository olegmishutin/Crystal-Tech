from rest_framework import serializers
from .models import Language
from level.models import Level
from level.serializers import LevelSerializer


class LanguageSerializer(serializers.ModelSerializer):
    levels = LevelSerializer(many=True, required=False)
    image = serializers.ImageField()

    class Meta:
        model = Language
        fields = ['id', 'name', 'image', 'levels']
