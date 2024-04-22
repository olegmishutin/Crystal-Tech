from rest_framework import viewsets
from language.serializers import LanguageSerializer
from .models import Language


class LanguageViewSet(viewsets.ModelViewSet):
    queryset = Language.objects.all().prefetch_related(
        'accepted_users', 'levels__tasks__testCases', 'levels__material', 'levels__material__sites')
    serializer_class = LanguageSerializer
