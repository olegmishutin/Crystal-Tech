from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAdminUser
from django.shortcuts import get_object_or_404
from django.http import FileResponse
from .models import Material, Site
from .serializers import MaterialSerializer, SiteSerializer


class AdminMaterialViewSet(viewsets.ModelViewSet):
    queryset = Material.objects.all()
    serializer_class = MaterialSerializer
    permission_classes = [IsAdminUser]


class AdminSitesViewSet(viewsets.ModelViewSet):
    queryset = Site.objects.all()
    serializer_class = SiteSerializer
    permission_classes = [IsAdminUser]


@api_view(['GET'])
def get_material(request, pk, format=None):
    material = get_object_or_404(Material.objects.all(), pk=pk)
    return FileResponse(material.file, as_attachment=True)
