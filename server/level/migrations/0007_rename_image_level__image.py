# Generated by Django 5.0.2 on 2024-03-07 08:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('level', '0006_alter_level_image'),
    ]

    operations = [
        migrations.RenameField(
            model_name='level',
            old_name='image',
            new_name='_image',
        ),
    ]