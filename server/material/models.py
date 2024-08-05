import os
from django.db import models
from level.models import Level


class Material(models.Model):
    level = models.OneToOneField(Level, on_delete=models.CASCADE, verbose_name='уровень')
    name = models.CharField('название', max_length=150)
    _file = models.FileField('файл', upload_to='materialsFiles/')

    class Meta:
        db_table = 'Material'
        verbose_name = 'Материал'
        verbose_name_plural = 'Материалы'

    @property
    def file(self):
        return self._file

    @file.setter
    def file(self, value):
        if self._file and os.path.exists(self._file.path):
            os.remove(self._file.path)

        self._file = value

    def delete(self, *args, **kwargs):
        if self._file and os.path.exists(self._file.path):
            os.remove(self._file.path)

        return super(Material, self).delete(*args, **kwargs)

    def __str__(self):
        return self.name


class Site(models.Model):
    material = models.ForeignKey(Material, related_name='sites', on_delete=models.CASCADE, verbose_name='материал')
    href = models.URLField('ссылка')

    class Meta:
        db_table = 'Site'
        verbose_name = 'Сайт'
        verbose_name_plural = 'Сайты'

    def __str__(self):
        return self.href
