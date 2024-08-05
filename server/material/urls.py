from rest_framework.routers import DefaultRouter
from django.urls import re_path, include
from . import views

router = DefaultRouter()
router.register('materials', views.AdminMaterialViewSet, basename='materials')
router.register('sites', views.AdminSitesViewSet, basename='sites')

app_name = 'material'
urlpatterns = [
    re_path(r'^admin/', include(router.urls)),
    re_path(r'^get-material/(?P<pk>\w+)$', views.get_material, name='material')
]
