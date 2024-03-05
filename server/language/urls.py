from django.urls import re_path, include
from . import views

app_name = 'language'
urlpatterns = [
    re_path(r'^admin/', include([
        re_path(r'^languages$', views.AdminLanguagesView.as_view(), name='admin-languages'),
        re_path(r'^language/(?P<pk>\w+)$', views.AdminLanguageView.as_view(), name='admin-language'),
    ])),
]
