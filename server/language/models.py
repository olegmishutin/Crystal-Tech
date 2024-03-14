import os
from django.db import models
from users.models import User


class Language(models.Model):
    choices = {
        'js': 'JavaScript'
    }

    name = models.CharField(max_length=150, choices=choices, unique=True)
    _image = models.ImageField(upload_to='languagesIcons/')
    users = models.ManyToManyField(User, db_table='CompletedLanguage', related_name='completedLanguages')

    class Meta:
        db_table = 'Language'
        verbose_name = 'Язык'
        verbose_name_plural = 'Языки'

    @property
    def image(self):
        return self._image
    @image.setter
    def image(self, value):
        if self._image and os.path.exists(self._image.path):
            os.remove(self._image.path)

        self._image = value

    def delete(self, *args, **kwargs):
        if os.path.exists(self._image.path):
            os.remove(self._image.path)

        return super(Language, self).delete(*args, **kwargs)

    def __str__(self):
        return self.name
