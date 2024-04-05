from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser
from django.http import FileResponse
from .models import Material, Site
from .serializers import MaterialSerializer, SiteSerializer


class MaterialViewSet(viewsets.ModelViewSet):
    queryset = Material.objects.all()
    serializer_class = MaterialSerializer
    permission_classes = [IsAdminUser]


class SitesViewSet(viewsets.ModelViewSet):
    queryset = Site.objects.all()
    serializer_class = SiteSerializer
    permission_classes = [IsAdminUser]


class MaterialView(APIView):
    def get(self, request, pk, format=None):
        material = Material.objects.get(pk=pk)
        file = material.file

        return FileResponse(file, as_attachment=True)
