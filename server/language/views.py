from rest_framework import viewsets, generics
from rest_framework.permissions import IsAdminUser
from .serializers import LanguageSerializer
from .models import Language


class AdminLanguageViewSet(viewsets.ModelViewSet):
    queryset = Language.objects.all().prefetch_related(
        'accepted_users', 'levels__tasks__testCases', 'levels__material', 'levels__material__sites')
    serializer_class = LanguageSerializer
    permission_classes = [IsAdminUser]
