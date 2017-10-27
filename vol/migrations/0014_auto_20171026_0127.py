# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-10-26 01:27
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vol', '0013_auto_20171019_0410'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='job',
            options={'ordering': ['created_at']},
        ),
        migrations.AlterModelOptions(
            name='labels',
            options={'ordering': ['created_at']},
        ),
        migrations.AlterModelOptions(
            name='organisation',
            options={'ordering': ['created_at']},
        ),
        migrations.AlterModelOptions(
            name='site',
            options={'ordering': ['created_at']},
        ),
        migrations.AlterField(
            model_name='organisation',
            name='description',
            field=models.CharField(max_length=4000),
        ),
    ]