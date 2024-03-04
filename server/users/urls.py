from django.urls import re_path
from . import views

app_name = 'users'
urlpatterns = [
    re_path(r'^login$', views.LoginView.as_view(), name='login'),
    re_path(r'^register$', views.RegisterView.as_view(), name='register'),
    re_path(r'^me$', views.ProfileView.as_view(), name='profile')
]
