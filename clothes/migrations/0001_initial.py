# Generated by Django 4.1 on 2022-08-24 08:15

import cloudinary.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Clothes',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name_of_item', models.CharField(max_length=100)),
                ('brand', models.CharField(max_length=100)),
                ('size', models.CharField(max_length=10)),
                ('description', models.TextField()),
                ('price', models.DecimalField(decimal_places=2, max_digits=8)),
                ('tags', models.CharField(choices=[('TOP', 'Top'), ('SKIRT', 'Skirt'), ('SHORTS', 'Shorts'), ('PANTS', 'Pants'), ('DRESS', 'Dress'), ('SET', 'Set'), ('OUTERWEAR', 'Outerwear'), ('ACCESSORIES', 'Accessories')], default='TOP', max_length=11)),
                ('date_listed', models.DateField(auto_now=True)),
                ('availability', models.BooleanField(default=True)),
                ('image', cloudinary.models.CloudinaryField(max_length=255, verbose_name='image')),
                ('email', models.ForeignKey(db_column='email', db_index=False, on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]