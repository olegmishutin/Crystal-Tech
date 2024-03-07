from rest_framework import serializers
from .models import Material, Site


class SiteSerializer(serializers.ModelSerializer):
    material = serializers.PrimaryKeyRelatedField(queryset=Material.objects.all(), required=False)

    class Meta:
        model = Site
        fields = ['id', 'href', 'material']

    def create(self, validated_data):
        if 'material' in validated_data:
            return super(SiteSerializer, self).create(validated_data)
        raise serializers.ValidationError({'material': ['This field is required.']})


class MaterialSerializer(serializers.ModelSerializer):
    sites = SiteSerializer(many=True, required=False)
    image = serializers.ImageField(required=False)
    file = serializers.FileField()

    class Meta:
        model = Material
        fields = ['id', 'name', 'image', 'file', 'level', 'sites']

    def create(self, validated_data):
        siteData = validated_data.pop('sites', [])
        material = Material.objects.create(**validated_data)

        for site in siteData:
            Site.objects.create(material=material, **site)
        return material
