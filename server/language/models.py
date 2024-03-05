import os
from django.db import models
from users.models import User


class Language(models.Model):
    name = models.CharField(max_length=150, unique=True)
    icon = models.FileField(upload_to='languagesIcons/')
    users = models.ManyToManyField(User, db_table='CompletedLanguage', related_name='completed_languages')

    class Meta:
        db_table = 'Language'
        verbose_name = 'Язык'
        verbose_name_plural = 'Языки'

    def delete(self, using=None, keep_parents=False):
        if os.path.exists(self.icon.path):
            os.remove(self.icon.path)

        super(Language, self).delete(using, keep_parents)

    def __str__(self):
        return self.name
