from rest_framework import serializers
from .models import Language
from level.models import Level


class LanguageSerializer(serializers.ModelSerializer):
    levels = serializers.PrimaryKeyRelatedField(queryset=Level.objects.all(), many=True, required=False)

    class Meta:
        model = Language
        fields = ['id', 'name', 'icon', 'levels']
