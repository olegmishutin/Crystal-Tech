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
    path('api/', include([
        path('', include('users.urls')),
        path('', include('language.urls')),
        path('', include('level.urls')),
        path('', include('material.urls')),
        path('', include('tests.urls')),
    ])),
    path('', include(static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT))),
    path('<path:path>', IndexView.as_view())
]
