from django.urls import re_path, include
from rest_framework.permissions import IsAdminUser, IsAuthenticatedOrReadOnly
from .views import LanguageViewSet
from .permissions import UserIsAccepted

adminLanguages = LanguageViewSet.as_view({
    'get': 'list',
    'post': 'create'
}, permission_classes=[IsAdminUser])

adminLanguage = LanguageViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
}, permission_classes=[IsAdminUser])

userLanguages = LanguageViewSet.as_view({
    'get': 'list'
}, permission_classes=[IsAuthenticatedOrReadOnly])

userLanguage = LanguageViewSet.as_view({
    'get': 'retrieve'
}, permission_classes=[UserIsAccepted, IsAuthenticatedOrReadOnly])

app_name = 'language'
urlpatterns = [
    re_path(r'^admin/', include([
        re_path(r'^languages$', adminLanguages, name='admin-languages'),
        re_path(r'^language/(?P<pk>\w+)$', adminLanguage, name='admin-language'),
    ])),
    re_path(r'^languages$', userLanguages, name='languages'),
    re_path(r'^language/(?P<pk>\w+)$', userLanguage, name='language')
]
