import os
from django.db import models
from users.models import User


class Language(models.Model):
    name = models.CharField(max_length=150, unique=True)
    _icon = models.ImageField(upload_to='languagesIcons/')
    users = models.ManyToManyField(User, db_table='CompletedLanguage', related_name='completed_languages')

    class Meta:
        db_table = 'Language'
        verbose_name = 'Язык'
        verbose_name_plural = 'Языки'

    @property
    def icon(self):
        return self._icon
    @icon.setter
    def icon(self, value):
        if self._icon and os.path.exists(self._icon.path):
            os.remove(self._icon.path)

        self._icon = value

    def delete(self, *args, **kwargs):
        if os.path.exists(self._icon.path):
            os.remove(self._icon.path)

        return super(Language, self).delete(*args, **kwargs)

    def __str__(self):
        return self.name
