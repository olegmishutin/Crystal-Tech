# Generated by Django 5.0.2 on 2024-03-05 11:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('language', '0002_alter_language_name'),
        ('level', '0002_task_number'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='level',
            unique_together={('language', 'number')},
        ),
    ]