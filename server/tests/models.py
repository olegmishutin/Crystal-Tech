from django.db import models
from django.contrib.auth import get_user_model
from language.models import Language
from server.utils.files import set_new_file, delete_old_files
from .validators import validate_percentage


class Test(models.Model):
    name = models.CharField('название', max_length=128)
    highest_score_percentage = models.PositiveSmallIntegerField(validators=[validate_percentage])

    passed_users = models.ManyToManyField(
        get_user_model(), through='TestResult', related_name='passed_tests', verbose_name='прошедшие пользователи')

    class Meta:
        db_table = 'Test'
        verbose_name = 'Тест'
        verbose_name_plural = 'Тесты'

    def delete(self, using=None, keep_parents=False):
        for question in self.questions.all():
            question.delete()

        super().delete(using, keep_parents)

    def __str__(self):
        return self.name


class TestResult(models.Model):
    user = models.ForeignKey(
        get_user_model(), related_name='tests_results', verbose_name='пользователь', on_delete=models.CASCADE)

    test = models.ForeignKey(Test, related_name='tests_results', verbose_name='тест', on_delete=models.CASCADE)
    mark = models.FloatField()

    class Meta:
        db_table = 'TestResult'
        verbose_name = 'Результат теста'
        verbose_name_plural = 'Результаты теста'


class Question(models.Model):
    test = models.ForeignKey(Test, related_name='questions', verbose_name='тест', on_delete=models.CASCADE)
    text = models.TextField('текст')

    class Meta:
        db_table = 'Question'
        verbose_name = 'Вопрос'
        verbose_name_plural = 'Вопросы'

    def delete(self, using=None, keep_parents=False):
        for image in self.images.all():
            image.delete()

        super().delete(using, keep_parents)

    def __str__(self):
        return self.text


def question_image_upload_to(instance, file):
    return f'tests/{instance.question.test.name}/{file}'


class QuestionImage(models.Model):
    question = models.ForeignKey(Question, related_name='images', verbose_name='вопрос', on_delete=models.CASCADE)
    _file = models.ImageField('картинка', upload_to=question_image_upload_to)

    class Meta:
        db_table = 'QuestionImage'
        verbose_name = 'Картинка вопроса'
        verbose_name_plural = 'Картинки вопросов'

    @property
    def file(self):
        return self._file

    @file.setter
    def file(self, value):
        set_new_file(self, '_file', value)

    def delete(self, using=None, keep_parents=False):
        delete_old_files(self._file)
        super().delete(using, keep_parents)


class Answer(models.Model):
    question = models.ForeignKey(Question, related_name='answers', verbose_name='вопрос', on_delete=models.CASCADE)
    text = models.TextField('текст')
    is_correct = models.BooleanField('правильный ли')

    class Meta:
        db_table = 'Answer'
        verbose_name = 'Ответ'
        verbose_name_plural = 'Ответы'

    def __str__(self):
        return self.text
