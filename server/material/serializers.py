from rest_framework import serializers
from .models import Material, Site


class MaterialSerializer(serializers.ModelSerializer):
    sites = serializers.PrimaryKeyRelatedField(queryset=Site.objects.all(), many=True, required=False)

    class Meta:
        model = Material
        fields = '__all__'


class SiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Site
        fields = '__all__'