# Generated by Django 5.0.2 on 2024-03-05 16:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('level', '0005_alter_level_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='level',
            name='image',
            field=models.ImageField(default='', upload_to='levelsImage/'),
            preserve_default=False,
        ),
    ]
