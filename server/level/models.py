from django.db import models
from language.models import Language
from django.contrib.auth import get_user_model
from server.utils.files import set_new_file, delete_old_files


class Level(models.Model):
    language = models.ForeignKey(Language, related_name='levels', on_delete=models.CASCADE, verbose_name='язык')
    number = models.PositiveIntegerField('номер')
    description = models.TextField('описание')
    _image = models.ImageField('картинка', upload_to='levelsImage/')
    users = models.ManyToManyField(get_user_model(), db_table='CompletedLevel', related_name='completedLevels',
                                   verbose_name='сдавшие')

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
        set_new_file(self, '_image', value)

    def delete(self, *args, **kwargs):
        delete_old_files(self._image)
        return super(Level, self).delete(*args, **kwargs)

    def __str__(self):
        return f'level {self.number}, {self.language.name}'


class Task(models.Model):
    number = models.PositiveIntegerField('номер')
    level = models.ForeignKey(Level, related_name='tasks', on_delete=models.CASCADE, verbose_name='уровень')
    text = models.TextField('текст')
    time = models.PositiveIntegerField('время (минуты)')
    users = models.ManyToManyField(get_user_model(), through='CompletedTask', related_name='completed_tasks',
                                   verbose_name='сдавшие')

    class Meta:
        db_table = 'Task'
        verbose_name = 'Задача'
        verbose_name_plural = 'Задачи'
        unique_together = ['number', 'level']
        ordering = ['number']

    def __str__(self):
        return f'task {self.number}, {self.level}'


class TestCase(models.Model):
    task = models.ForeignKey(Task, related_name='testCases', on_delete=models.CASCADE, verbose_name='задача')
    code = models.TextField('код проверки')
    text = models.CharField('текст', max_length=300)

    class Meta:
        db_table = 'TestCase'
        verbose_name = 'Тест кейс'
        verbose_name_plural = 'Тест кейсы'

    def __str__(self):
        return self.text


class CompletedTask(models.Model):
    task = models.ForeignKey(Task, related_name='completedTasks', on_delete=models.CASCADE, verbose_name='задача')
    level = models.ForeignKey(Level, related_name='completedTasks', on_delete=models.CASCADE, verbose_name='урвоень')
    user = models.ForeignKey(get_user_model(), related_name='completedTasks', on_delete=models.CASCADE,
                             verbose_name='пользователь')

    class Meta:
        db_table = 'CompletedTask'
        verbose_name = 'Законченное задание'
        verbose_name_plural = 'Законченные задания'

    def __str__(self):
        return f'task {self.task}, level {self.level}, user {self.user}'
