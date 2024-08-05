import os
from django.db import models
from django.contrib.auth import get_user_model


class Language(models.Model):
    choices = {
        'js': 'JavaScript',
        'py': 'Python'
    }

    name = models.CharField('название', max_length=150, choices=choices, unique=True)
    _image = models.ImageField('картинка', upload_to='languagesIcons/')
    users = models.ManyToManyField(get_user_model(), db_table='CompletedLanguage', related_name='completedLanguages',
                                   verbose_name='сдавшие')
    is_closed = models.BooleanField('является ли закрытым', default=False)
    accepted_users = models.ManyToManyField(get_user_model(), db_table='Accepted_Users',
                                            related_name='acceptedLanguages', verbose_name='допущенные пользователи')

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
        for level in self.levels.all():
            level.delete()

        if os.path.exists(self._image.path):
            os.remove(self._image.path)

        return super(Language, self).delete(*args, **kwargs)

    def __str__(self):
        return self.name
