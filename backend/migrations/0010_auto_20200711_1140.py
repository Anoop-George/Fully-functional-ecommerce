# Generated by Django 3.0.8 on 2020-07-11 08:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0009_auto_20200709_1122'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='brand',
            field=models.CharField(default='motorolla', max_length=200),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='product',
            name='catagory',
            field=models.CharField(max_length=200),
        ),
    ]