from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings


urlpatterns = [
    path('api/', include([
        path('', include('users.urls')),
        path('', include('language.urls')),
        path('', include('level.urls')),
        path('', include('material.urls')),
        path('', include('tests.urls')),
    ])),
    path('', include(static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT))),
]
