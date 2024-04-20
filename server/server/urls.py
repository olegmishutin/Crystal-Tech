"""
URL configuration for server project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework.response import Response


class IndexView(APIView):
    renderer_classes = [TemplateHTMLRenderer]

    def get(self, request, path=None):
        return Response({}, template_name='index.html')


urlpatterns = [
    path('', IndexView.as_view()),
    path('api/', include('users.urls')),
    path('api/', include('language.urls')),
    path('api/', include('level.urls')),
    path('api/', include('material.urls')),
    path('', include(static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT))),
    path('<path:path>', IndexView.as_view())
]
