import os
from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from .managers import CustomUserManager
from server.utils.files import set_new_file, delete_old_files


class User(AbstractBaseUser):
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    email = models.EmailField('email', unique=True)
    name = models.CharField('имя', max_length=150)
    age = models.PositiveIntegerField('возрас', default=0)
    group = models.CharField('группа', max_length=150, default='', null=True, blank=True)
    _photo = models.ImageField('фото', upload_to="usersPhotos/", null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    objects = CustomUserManager()

    class Meta:
        db_table = 'User'
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'

    @property
    def photo(self):
        return self._photo

    @photo.setter
    def photo(self, value):
        set_new_file(self, '_photo', value)

    def delete(self, using=None, keep_parents=False):
        delete_old_files(self._photo)
        return super(User, self).delete(using, keep_parents)

    def __str__(self):
        return self.email
