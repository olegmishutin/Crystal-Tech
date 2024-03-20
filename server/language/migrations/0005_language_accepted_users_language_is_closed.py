# Generated by Django 5.0.2 on 2024-03-20 17:04

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('language', '0004_alter_language_name'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='language',
            name='accepted_users',
            field=models.ManyToManyField(db_table='Accepted_Users', related_name='acceptedLanguages', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='language',
            name='is_closed',
            field=models.BooleanField(default=False),
        ),
    ]