# Generated by Django 5.0.2 on 2024-03-14 10:50

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('level', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name='level',
            name='users',
            field=models.ManyToManyField(db_table='CompletedLevel', related_name='completedLevels', to=settings.AUTH_USER_MODEL),
        ),
    ]
