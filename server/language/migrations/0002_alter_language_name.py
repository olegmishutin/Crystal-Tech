# Generated by Django 5.0.2 on 2024-03-05 10:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('language', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='language',
            name='name',
            field=models.CharField(max_length=150, unique=True),
        ),
    ]