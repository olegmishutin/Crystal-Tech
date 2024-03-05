from django.urls import re_path, include
from . import views


app_name = 'material'
urlpatterns = [
    re_path(r'^admin/', include([
        re_path(r'^materials$', views.AdminMaterialsView.as_view(), name='admin-materials'),
        re_path(r'^material/(?P<pk>\w+)$', views.AdminMaterialView.as_view(), name='admin-material'),
        re_path(r'^sites$', views.AdminSitesView.as_view(), name='admin-sites'),
        re_path(r'^site/(?P<pk>\w+)$', views.AdminSiteView.as_view(), name='admin-site'),
    ]))
]