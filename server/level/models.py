import os
from django.db import models
from language.models import Language
from users.models import User


class Level(models.Model):
    language = models.ForeignKey(Language, related_name='levels', on_delete=models.CASCADE)
    number = models.IntegerField()
    description = models.TextField()
    _image = models.ImageField(upload_to='levelsImage/')
    users = models.ManyToManyField(User, db_table='CompletedLevel', related_name='completedLevels')

    class Meta:
        db_table = 'Level'
        verbose_name = 'Уровень'
        verbose_name_plural = 'Уровни'
        unique_together = ['language', 'number']
        ordering = ['number']

    @property
    def image(self):
        return self._image

    @image.setter
    def image(self, value):
        if self._image and os.path.exists(self._image.path):
            os.remove(self._image.path)

        self._image = value

    def delete(self, *args, **kwargs):
        if self._image and os.path.exists(self._image.path):
            os.remove(self._image.path)

        return super(Level, self).delete(*args, **kwargs)

    def __str__(self):
        return f'level {self.number}, {self.language.name}'


class Task(models.Model):
    number = models.IntegerField()
    level = models.ForeignKey(Level, related_name='tasks', on_delete=models.CASCADE)
    text = models.TextField()
    time = models.IntegerField()
    users = models.ManyToManyField(User, through='CompletedTask', related_name='completed_tasks')

    class Meta:
        db_table = 'Task'
        verbose_name = 'Задача'
        verbose_name_plural = 'Задачи'
        unique_together = ['number', 'level']
        ordering = ['number']

    def __str__(self):
        return f'task {self.number}, {self.level}'


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


class CompletedTask(models.Model):
    task = models.ForeignKey(Task, related_name='completedTasks', on_delete=models.CASCADE)
    level = models.ForeignKey(Level, related_name='completedTasks', on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name='completedTasks', on_delete=models.CASCADE)

    class Meta:
        db_table = 'CompletedTask'
        verbose_name = 'Законченное задание'
        verbose_name_plural = 'Законченные задания'

    def __str__(self):
        return f'task {self.task}, level {self.level}, user {self.user}'
