# Generated by Django 5.0.2 on 2024-03-11 16:16

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('level', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Material',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
                ('_image', models.ImageField(blank=True, null=True, upload_to='materialsImage/')),
                ('_file', models.FileField(upload_to='materialsFiles/')),
                ('level', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='level.level')),
            ],
            options={
                'verbose_name': 'Материал',
                'verbose_name_plural': 'Материалы',
                'db_table': 'Material',
            },
        ),
        migrations.CreateModel(
            name='Site',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('href', models.TextField()),
                ('material', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sites', to='material.material')),
            ],
            options={
                'verbose_name': 'Сайт',
                'verbose_name_plural': 'Сайты',
                'db_table': 'Site',
            },
        ),
    ]
