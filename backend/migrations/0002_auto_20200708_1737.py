# Generated by Django 3.0.8 on 2020-07-08 14:37

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='comment',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='product',
            name='rating',
            field=models.ManyToManyField(blank=True, related_name='ratings', to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='UserRating',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rate', models.PositiveSmallIntegerField(choices=[(4, 'excellent'), (3, 'very good'), (2, 'good'), (1, 'bad')])),
                ('status', models.BooleanField(default=False)),
                ('author', models.ManyToManyField(to=settings.AUTH_USER_MODEL)),
                ('product', models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to='backend.Product')),
            ],
        ),
    ]