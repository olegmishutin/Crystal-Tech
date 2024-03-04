import os
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.parsers import MultiPartParser
from django.contrib.auth import authenticate, login
from .models import User
from .serializers import RegistrationSerializer, UserProfileSerializer


class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(email=email, password=password)
        if user:
            login(request, user)
            return Response({'message': 'Logged', 'username': user.name}, status=status.HTTP_200_OK)
        return Response({'message': 'Bad date'}, status=status.HTTP_400_BAD_REQUEST)


class RegisterView(generics.CreateAPIView):
    serializer_class = RegistrationSerializer


class ProfileView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

    def perform_update(self, serializer):
        if 'photo' in serializer.validated_data:
            oldPhoto = self.request.user.photo

            if oldPhoto and os.path.exists(oldPhoto.path):
                os.remove(oldPhoto.path)
        serializer.save()
