from rest_framework.routers import DefaultRouter
from rest_framework.permissions import IsAuthenticated
from django.urls import re_path, include
from .permissions import TaskIsCanBePassed
from . import views

router = DefaultRouter()
router.register('levels', views.AdminLevelViewSet, basename='levels')
router.register('tasks', views.AdminTaskViewSet, basename='tasks')
router.register('test-cases', views.AdminTestCaseViewSet, basename='test-cases')

userLevel = views.AdminLevelViewSet.as_view({
    'get': 'retrieve'
}, permission_classes=[IsAuthenticated])

userTasks = views.AdminTaskViewSet.as_view({
    'get': 'retrieve'
}, permission_classes=[IsAuthenticated, TaskIsCanBePassed])

app_name = 'level'
urlpatterns = [
    re_path(r'^admin/', include(router.urls)),
    re_path(r'^level/(?P<pk>\w+)$', userLevel, name='level'),
    re_path(r'^task/(?P<pk>\w+)$', userTasks, name='task'),
    re_path(r'^check-code$', views.check_code_view, name='check-code')
]
