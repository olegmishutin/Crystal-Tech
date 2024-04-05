from django.urls import re_path, include
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from . import views
from .permissions import TaskIsCanBePassed

adminLevels = views.LevelViewSet.as_view({
    'get': 'list',
    'post': 'create'
}, permission_classes=[IsAdminUser])

adminLevel = views.LevelViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
}, permission_classes=[IsAdminUser])

adminTasks = views.TaskViewSet.as_view({
    'get': 'list',
    'post': 'create'
}, permission_classes=[IsAdminUser])

adminTask = views.TaskViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
}, permission_classes=[IsAdminUser])

adminTestCases = views.TestCaseViewSet.as_view({
    'get': 'list',
    'post': 'create'
}, permission_classes=[IsAdminUser])

adminTestCase = views.TestCaseViewSet.as_view({
    'get': 'retrieve',
    'put': 'create',
    'patch': 'partial_update',
    'delete': 'destroy'
}, permission_classes=[IsAdminUser])

userLevel = views.LevelViewSet.as_view({
    'get': 'retrieve'
}, permission_classes=[IsAuthenticated])

userTasks = views.TaskViewSet.as_view({
    'get': 'retrieve'
}, permission_classes=[IsAuthenticated, TaskIsCanBePassed])

app_name = 'level'
urlpatterns = [
    re_path(r'^admin/', include([
        re_path(r'^levels$', adminLevels, name='admin-levels'),
        re_path(r'^level/(?P<pk>\w+)$', adminLevel, name='admin-level'),
        re_path(r'^tasks$', adminTasks, name='admin-tasks'),
        re_path(r'^task/(?P<pk>\w+)$', adminTask, name='admin-task'),
        re_path(r'^test-cases$', adminTestCases, name='admin-test-cases'),
        re_path(r'^test-case/(?P<pk>\w+)$', adminTestCase, name='admin-test-case'),
    ])),
    re_path(r'^level/(?P<pk>\w+)$', userLevel, name='level'),
    re_path(r'^task/(?P<pk>\w+)$', userTasks, name='task'),
    re_path(r'^check-code$', views.CodeCheckerView.as_view(), name='check-code')
]
