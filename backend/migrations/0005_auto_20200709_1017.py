# Generated by Django 3.0.8 on 2020-07-09 07:17

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('backend', '0004_auto_20200708_2252'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='avarage',
            field=models.ManyToManyField(blank=True, related_name='avarage', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='product',
            name='bad',
            field=models.ManyToManyField(blank=True, related_name='bad', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='product',
            name='good',
            field=models.ManyToManyField(blank=True, related_name='good', to=settings.AUTH_USER_MODEL),
        ),
        migrations.DeleteModel(
            name='ProductRating',
        ),
    ]