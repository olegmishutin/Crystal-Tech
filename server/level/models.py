import os
from django.db import models
from language.models import Language
from users.models import User


class Level(models.Model):
    language = models.ForeignKey(Language, related_name='levels', on_delete=models.CASCADE)
    number = models.IntegerField()
    description = models.TextField()
    image = models.ImageField(upload_to='levelsImage/')
    users = models.ManyToManyField(User, db_table='CompletedLevel', related_name='completed_levels')

    class Meta:
        db_table = 'Level'
        verbose_name = 'Уровень'
        verbose_name_plural = 'Уровни'
        unique_together = ['language', 'number']

    def delete(self, using=None, keep_parents=False):
        if os.path.exists(self.image.path):
            os.remove(self.image.path)

        super(Level, self).delete(using, keep_parents)

    def __str__(self):
        return f'level {self.number}, {self.language.name}'


class Task(models.Model):
    number = models.IntegerField()
    level = models.ForeignKey(Level, related_name='tasks', on_delete=models.CASCADE)
    text = models.TextField()
    users = models.ManyToManyField(User, db_table='CompletedTask', related_name='completed_tasks')

    class Meta:
        db_table = 'Task'
        verbose_name = 'Задача'
        verbose_name_plural = 'Задачи'
        unique_together = ['number', 'level']

    def __str__(self):
        return self.text[:10]


class TestCase(models.Model):
    task = models.ForeignKey(Task, related_name='testCases', on_delete=models.CASCADE)
    code = models.TextField()
    text = models.CharField(max_length=300)

    class Meta:
        db_table = 'TestCase'
        verbose_name = 'Тест кейс'
        verbose_name_plural = 'Тест кейсы'

    def __str__(self):
        return self.text
