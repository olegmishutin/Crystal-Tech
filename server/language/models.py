from django.db import models
from users.models import User


class Language(models.Model):
    name = models.CharField(max_length=150)
    icon = models.FileField(upload_to='languagesIcons/')
    users = models.ManyToManyField(User, db_table='CompletedLanguage', related_name='completed_languages')

    class Meta:
        db_table = 'Language'
        verbose_name = 'Язык'
        verbose_name_plural = 'Языки'

    def __str__(self):
        return self.name
