# Generated by Django 2.1.5 on 2019-02-13 03:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0010_auto_20190212_2249'),
    ]

    operations = [
        migrations.RenameField(
            model_name='servant',
            old_name='skil_1',
            new_name='skill_1',
        ),
        migrations.RenameField(
            model_name='servant',
            old_name='skil_2',
            new_name='skill_2',
        ),
        migrations.RenameField(
            model_name='servant',
            old_name='skil_3',
            new_name='skill_3',
        ),
    ]
