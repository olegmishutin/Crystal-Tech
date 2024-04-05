from rest_framework import viewsets
from language.serializers import LanguageSerializer
from .models import Language


class LanguageViewSet(viewsets.ModelViewSet):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer
