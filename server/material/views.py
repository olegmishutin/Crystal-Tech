import os
from rest_framework import generics
from rest_framework.permissions import IsAdminUser
from .models import Material, Site
from .serializers import MaterialSerializer, SiteSerializer


class AdminMaterialsView(generics.ListCreateAPIView):
    queryset = Material.objects.all()
    serializer_class = MaterialSerializer
    permission_classes = [IsAdminUser]


class AdminMaterialView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Material.objects.all()
    serializer_class = MaterialSerializer
    permission_classes = [IsAdminUser]

    def perform_update(self, serializer):
        pk = self.kwargs.get('pk')
        material = Material.objects.get(pk=pk)

        if 'image' in serializer.validated_data:
            if os.path.exists(material.image.path):
                os.remove(material.image.path)

        if 'file' in serializer.validated_data:
            if os.path.exists(material.file.path):
                os.remove(material.file.path)
        serializer.save()


class AdminSitesView(generics.ListCreateAPIView):
    queryset = Site.objects.all()
    serializer_class = SiteSerializer
    permission_classes = [IsAdminUser]


class AdminSiteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Site.objects.all()
    serializer_class = SiteSerializer
    permission_classes = [IsAdminUser]
