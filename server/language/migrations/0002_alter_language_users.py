# Generated by Django 5.0.2 on 2024-03-14 10:52

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('language', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name='language',
            name='users',
            field=models.ManyToManyField(db_table='CompletedLanguage', related_name='completedLanguages', to=settings.AUTH_USER_MODEL),
        ),
    ]
