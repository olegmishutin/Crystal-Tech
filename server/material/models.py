import os
from django.db import models
from level.models import Level


class Material(models.Model):
    level = models.OneToOneField(Level, on_delete=models.CASCADE)
    name = models.CharField(max_length=150)
    _image = models.ImageField(upload_to='materialsImage/', null=True, blank=True)
    _file = models.FileField(upload_to='materialsFiles/')

    class Meta:
        db_table = 'Material'
        verbose_name = 'Материал'
        verbose_name_plural = 'Материалы'

    @property
    def image(self):
        return self._image

    @image.setter
    def image(self, value):
        if self._image and os.path.exists(self._image.path):
            os.remove(self._image.path)

        self._image = value

    @property
    def file(self):
        return self._file

    @file.setter
    def file(self, value):
        if self._file and os.path.exists(self._file.path):
            os.remove(self._file.path)

        self._file = value

    def delete(self, *args, **kwargs):
        if os.path.exists(self._file.path):
            os.remove(self._file.path)

        if self._image and os.path.exists(self._image.path):
            os.remove(self._image.path)

        return super(Material, self).delete(*args, **kwargs)

    def __str__(self):
        return self.name


class Site(models.Model):
    material = models.ForeignKey(Material, related_name='sites', on_delete=models.CASCADE)
    href = models.TextField()

    class Meta:
        db_table = 'Site'
        verbose_name = 'Сайт'
        verbose_name_plural = 'Сайты'

    def __str__(self):
        return self.href
