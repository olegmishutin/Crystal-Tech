from rest_framework import serializers
from .models import Material, Site


class SiteSerializer(serializers.ModelSerializer):
    material = serializers.PrimaryKeyRelatedField(queryset=Material.objects.all())

    class Meta:
        model = Site
        fields = ['id', 'href', 'material']


class MaterialSerializer(serializers.ModelSerializer):
    sites = SiteSerializer(many=True, required=False)
    file = serializers.FileField()

    class Meta:
        model = Material
        fields = ['id', 'name', 'file', 'level', 'sites']
