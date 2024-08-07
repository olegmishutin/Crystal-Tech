# Generated by Django 5.0.2 on 2024-08-07 11:00

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('language', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Level',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.PositiveIntegerField(verbose_name='номер')),
                ('description', models.TextField(verbose_name='описание')),
                ('_image', models.ImageField(upload_to='levelsImage/', verbose_name='картинка')),
                ('language', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='levels', to='language.language', verbose_name='язык')),
                ('users', models.ManyToManyField(db_table='CompletedLevel', related_name='completedLevels', to=settings.AUTH_USER_MODEL, verbose_name='сдавшие')),
            ],
            options={
                'verbose_name': 'Уровень',
                'verbose_name_plural': 'Уровни',
                'db_table': 'Level',
                'ordering': ['number'],
                'unique_together': {('language', 'number')},
            },
        ),
        migrations.CreateModel(
            name='CompletedTask',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='completedTasks', to=settings.AUTH_USER_MODEL, verbose_name='пользователь')),
                ('level', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='completedTasks', to='level.level', verbose_name='урвоень')),
            ],
            options={
                'verbose_name': 'Законченное задание',
                'verbose_name_plural': 'Законченные задания',
                'db_table': 'CompletedTask',
            },
        ),
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.PositiveIntegerField(verbose_name='номер')),
                ('text', models.TextField(verbose_name='текст')),
                ('time', models.PositiveIntegerField(verbose_name='время (минуты)')),
                ('level', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tasks', to='level.level', verbose_name='уровень')),
                ('users', models.ManyToManyField(related_name='completed_tasks', through='level.CompletedTask', to=settings.AUTH_USER_MODEL, verbose_name='сдавшие')),
            ],
            options={
                'verbose_name': 'Задача',
                'verbose_name_plural': 'Задачи',
                'db_table': 'Task',
                'ordering': ['number'],
                'unique_together': {('number', 'level')},
            },
        ),
        migrations.AddField(
            model_name='completedtask',
            name='task',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='completedTasks', to='level.task', verbose_name='задача'),
        ),
        migrations.CreateModel(
            name='TestCase',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.TextField(verbose_name='код проверки')),
                ('text', models.CharField(max_length=300, verbose_name='текст')),
                ('task', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='testCases', to='level.task', verbose_name='задача')),
            ],
            options={
                'verbose_name': 'Тест кейс',
                'verbose_name_plural': 'Тест кейсы',
                'db_table': 'TestCase',
            },
        ),
    ]
