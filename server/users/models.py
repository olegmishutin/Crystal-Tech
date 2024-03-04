from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from .managers import CustomUserManager


class User(AbstractUser):
    username = None
    first_name = None
    last_name = None
    date_joined = None
    is_active = True

    email = models.EmailField(_("email address"), unique=True)
    name = models.CharField(max_length=150)
    age = models.IntegerField(default=0)
    photo = models.ImageField(upload_to="usersPhotos/", null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    objects = CustomUserManager()

    class Meta:
        db_table = 'User'
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'

    def get_full_name(self):
        return self.name

    def __str__(self):
        return self.email