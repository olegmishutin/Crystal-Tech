# Generated by Django 5.0.2 on 2024-04-05 12:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('level', '0004_alter_task_options'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='level',
            options={'ordering': ['number'], 'verbose_name': 'Уровень', 'verbose_name_plural': 'Уровни'},
        ),
    ]
