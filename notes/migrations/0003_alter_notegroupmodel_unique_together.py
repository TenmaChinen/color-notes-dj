# Generated by Django 3.2.6 on 2022-08-08 09:32

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('notes', '0002_alter_notegroupmodel_user'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='notegroupmodel',
            unique_together={('id', 'user')},
        ),
    ]
