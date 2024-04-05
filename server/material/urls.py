from django.urls import re_path, include
from . import views

adminMaterials = views.MaterialViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

adminMaterial = views.MaterialViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

adminSites = views.SitesViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

adminSite = views.SitesViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

app_name = 'material'
urlpatterns = [
    re_path(r'^admin/', include([
        re_path(r'^materials$', adminMaterials, name='admin-materials'),
        re_path(r'^material/(?P<pk>\w+)$', adminMaterial, name='admin-material'),
        re_path(r'^sites$', adminSites, name='admin-sites'),
        re_path(r'^site/(?P<pk>\w+)$', adminSite, name='admin-site'),
    ])),
    re_path(r'^get-material/(?P<pk>\w+)$', views.MaterialView.as_view(), name='material')
]
