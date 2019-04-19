# Generated by Django 2.1.5 on 2019-02-13 03:25

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0005_auto_20190212_2222'),
    ]

    operations = [
        migrations.AlterField(
            model_name='activeskilleffect',
            name='level_1',
            field=models.DecimalField(decimal_places=1, default=1, max_digits=6, validators=[django.core.validators.MinValueValidator(1)]),
        ),
        migrations.AlterField(
            model_name='activeskilleffect',
            name='level_10',
            field=models.DecimalField(decimal_places=1, default=1, max_digits=6, validators=[django.core.validators.MinValueValidator(1)]),
        ),
    ]