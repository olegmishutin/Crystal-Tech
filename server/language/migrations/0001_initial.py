# Generated by Django 5.0.2 on 2024-03-04 13:53

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Language',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
                ('icon', models.FileField(upload_to='languagesIcons/')),
                ('users', models.ManyToManyField(db_table='CompletedLanguage', related_name='completed_languages', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Язык',
                'verbose_name_plural': 'Языки',
                'db_table': 'Language',
            },
        ),
    ]
