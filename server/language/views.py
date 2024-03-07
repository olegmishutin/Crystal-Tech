from rest_framework.response import Response
from rest_framework import generics
from rest_framework.permissions import IsAdminUser
from language.serializers import LanguageSerializer
from .models import Language


class AdminLanguagesView(generics.ListCreateAPIView):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer
    permission_classes = [IsAdminUser]


class AdminLanguageView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer
    permission_classes = [IsAdminUser]
