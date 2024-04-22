import os
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.parsers import MultiPartParser
from django.contrib.auth import authenticate, login, logout
from .models import User
from .serializers import RegistrationSerializer, UserProfileSerializer, UserSerializer
from language.models import Language
from level.models import CompletedTask


class LoginLogoutView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(email=email, password=password)
        if user:
            login(request, user)
            return Response({'message': 'Logged', 'username': user.name}, status=status.HTTP_200_OK)
        return Response({'message': 'Bad data'}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        if request.user.is_authenticated:
            logout(request)
            return Response({'message': 'Logged out!'}, status=status.HTTP_200_OK)
        return Response({'message': 'Not logged in!'}, status=status.HTTP_400_BAD_REQUEST)


class RegisterView(generics.CreateAPIView):
    serializer_class = RegistrationSerializer


class AllUsersView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        value = self.request.query_params.get('userEmailOrGroup')
        allUsers = User.objects.all().prefetch_related('completedLanguages', 'completedLevels', 'completedTasks')

        if value:
            users = allUsers.filter(email__icontains=value)

            if not users.exists():
                users = allUsers.filter(group__icontains=value)

            if not users.exists():
                users = allUsers.filter(name__icontains=value)

            return users
        return allUsers

    def addOrRemoveAcceptedUser(self, request):
        userId = request.data.get('userId')
        languageId = request.data.get('languageId')

        if userId and languageId:
            user = User.objects.get(pk=userId)
            language = Language.objects.get(pk=languageId)

            if request.method == 'POST':
                language.accepted_users.add(user)
                return Response({'message': 'User accepted'}, status=status.HTTP_200_OK)

            elif request.method == 'DELETE':
                language.accepted_users.remove(user)
                return Response({'message': 'User delete from accepted users'}, status=status.HTTP_200_OK)
        return Response({'message': 'Bad data'}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        return self.addOrRemoveAcceptedUser(request)

    def delete(self, request):
        return self.addOrRemoveAcceptedUser(request)


class DeleteUser(generics.DestroyAPIView):
    queryset = User.objects.all().prefetch_related('completedLanguages', 'completedLevels', 'completedTasks')
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]


class ProfileView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all().prefetch_related('completedLanguages', 'completedLevels', 'completedTasks')
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def get(self, request, *args, **kwargs):
        userSerializer = UserProfileSerializer(request.user, context={'request': self.request})
        data = {'user': userSerializer.data, 'languages': []}

        for language in Language.objects.all().prefetch_related('levels__tasks', 'levels__completedTasks__task'):
            levelsData = []
            levels = language.levels.all()
            completedLevels = []

            for completedLevel in levels:
                completedLevelTasksCount = CompletedTask.objects.filter(level=completedLevel, user=request.user).count()

                if completedLevel.tasks.count() == completedLevelTasksCount:
                    completedLevels.append(completedLevel.id)

            uncompletedLevels = [level.id for level in levels.exclude(id__in=completedLevels).order_by('number')]

            for level in levels:
                levelTasks = len(level.tasks.all())
                levelCompletedTasks = len(level.completedTasks.all())

                try:
                    completedPercentage = round(100 * levelCompletedTasks / levelTasks, 0)
                except ZeroDivisionError:
                    completedPercentage = 0

                isCurrentLevel = False
                if not uncompletedLevels:
                    if level.id == [level.id for level in levels][-1]:
                        isCurrentLevel = True
                else:
                    try:
                        isCurrentLevel = bool(uncompletedLevels.index(level.id) == 0)
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
