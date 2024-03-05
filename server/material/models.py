import os
from django.db import models
from level.models import Level


class Material(models.Model):
    level = models.OneToOneField(Level, on_delete=models.CASCADE)
    name = models.CharField(max_length=150)
    image = models.ImageField(upload_to='materialsImage/', null=True, blank=True)
    file = models.FileField(upload_to='materialsFiles/')

    class Meta:
        db_table = 'Material'
        verbose_name = 'Материал'
        verbose_name_plural = 'Материалы'


    def delete(self, *args, **kwargs):
        if os.path.exists(self.file.path):
            os.remove(self.file.path)

        if self.image and os.path.exists(self.image.path):
            os.remove(self.image.path)

        super(Material, self).delete(*args, **kwargs)

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