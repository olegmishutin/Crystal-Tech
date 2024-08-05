# Generated by Django 5.0.2 on 2024-08-05 11:31

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('language', '0005_language_accepted_users_language_is_closed'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name='language',
            name='_image',
            field=models.ImageField(upload_to='languagesIcons/', verbose_name='картинка'),
        ),
        migrations.AlterField(
            model_name='language',
            name='accepted_users',
            field=models.ManyToManyField(db_table='Accepted_Users', related_name='acceptedLanguages', to=settings.AUTH_USER_MODEL, verbose_name='допущенные пользователи'),
        ),
        migrations.AlterField(
            model_name='language',
            name='is_closed',
            field=models.BooleanField(default=False, verbose_name='является ли закрытым'),
        ),
        migrations.AlterField(
            model_name='language',
            name='name',
            field=models.CharField(choices=[('js', 'JavaScript'), ('py', 'Python')], max_length=150, unique=True, verbose_name='название'),
        ),
        migrations.AlterField(
            model_name='language',
            name='users',
            field=models.ManyToManyField(db_table='CompletedLanguage', related_name='completedLanguages', to=settings.AUTH_USER_MODEL, verbose_name='сдавшие'),
        ),
    ]
