from django.urls import re_path, include
from . import views

app_name = 'users'
urlpatterns = [
    re_path(r'^admin/', include([
        re_path(r'^all-users$', views.AllUsersView.as_view(), name='all-users'),
        re_path(r'^remove-accepted-user$', views.AllUsersView.as_view(), name='remove-accepted-user'),
    ])),
    re_path(r'^login$', views.LoginLogoutView.as_view(), name='login'),
    re_path(r'^logout$', views.LoginLogoutView.as_view(), name='logout'),
    re_path(r'^register$', views.RegisterView.as_view(), name='register'),
    re_path(r'^me$', views.ProfileView.as_view(), name='profile')
]
