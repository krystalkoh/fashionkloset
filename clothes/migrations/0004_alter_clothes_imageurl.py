# Generated by Django 4.1 on 2022-08-24 15:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clothes', '0003_clothes_imageurl'),
    ]

    operations = [
        migrations.AlterField(
            model_name='clothes',
            name='imageUrl',
            field=models.CharField(blank=True, max_length=500),
        ),
    ]