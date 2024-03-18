import os
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser
from django.contrib.auth import authenticate, login
from .models import User
from .serializers import RegistrationSerializer, UserProfileSerializer
from language.models import Language


class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(email=email, password=password)
        if user:
            login(request, user)
            return Response({'message': 'Logged', 'username': user.name}, status=status.HTTP_200_OK)
        return Response({'message': 'Bad data'}, status=status.HTTP_400_BAD_REQUEST)


class RegisterView(generics.CreateAPIView):
    serializer_class = RegistrationSerializer


class ProfileView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def get(self, request, *args, **kwargs):
        data = {'user': {}, 'languages': []}

        userSerializer = UserProfileSerializer(request.user, context={'request': self.request})
        data['user'] = userSerializer.data

        languages = Language.objects.all()
        for language in languages:
            levelsData = []
            levels = language.levels.all()

            for level in levels:
                levelTasks = len(level.tasks.all())
                levelCompletedTasks = len(level.completedTasks.all())

                try:
                    completedPercentage = round(100 * levelCompletedTasks / levelTasks, 0)
                except ZeroDivisionError:
                    completedPercentage = 0

                completedLevels = [level.id for level in request.user.completedLevels.all()]
                allLevels = [level.id for level in levels.exclude(id__in=completedLevels).order_by('number')]

                isCurrentLevel = False
                if not allLevels:
                    if level.id == [level.id for level in levels][-1]:
                        isCurrentLevel = True
                else:
                    try:
                        isCurrentLevel = bool(allLevels.index(level.id) == 0)
                    except ValueError:
                        isCurrentLevel = False

                is_completed = level.users.filter(id=request.user.id).exists()
                levelsData.append({'id': level.id, 'number': level.number, 'is_completed': is_completed,
                                   'completedPercentage': completedPercentage, 'is_current': isCurrentLevel})

            is_completed = language.users.filter(id=request.user.id).exists()
            data['languages'].append(
                {'name': language.get_name_display(), 'id': language.id, 'is_completed': is_completed,
                 'levels': levelsData})

        return Response(data, status=status.HTTP_200_OK)
