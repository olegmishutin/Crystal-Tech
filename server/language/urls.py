from rest_framework.routers import DefaultRouter
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.urls import re_path, include
from .permissions import UserIsAccepted
from . import views

router = DefaultRouter()
router.register('languages', views.AdminLanguageViewSet, basename='languages')

userLanguagesList = views.AdminLanguageViewSet.as_view(
    {'get': 'list'}, permission_classes=[IsAuthenticatedOrReadOnly])

userLanguagesDetail = views.AdminLanguageViewSet.as_view(
    {'get': 'retrieve'}, permission_classes=[UserIsAccepted, IsAuthenticatedOrReadOnly])

app_name = 'language'
urlpatterns = [
    re_path(r'^admin/', include(router.urls)),
    re_path(r'^languages$', userLanguagesList, name='languages-list'),
    re_path(r'^languages/(?P<pk>\w+)$', userLanguagesDetail, name='languages-detail')
]
