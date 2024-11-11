# migrations/0001_add_location_fields.py
from django.db import migrations, models

class Migration(migrations.Migration):
    dependencies = [
        ('database', '0004_hdb_data'),  # Replace with your last migration
    ]

    operations = [
        migrations.AddField(
            model_name='school_info',
            name='latitude',
            field=models.FloatField(null=True, blank=True),
        ),
        migrations.AddField(
            model_name='school_info',
            name='longitude',
            field=models.FloatField(null=True, blank=True),
        ),
        migrations.AddField(
            model_name='preschool_centre',
            name='latitude',
            field=models.FloatField(null=True, blank=True),
        ),
        migrations.AddField(
            model_name='preschool_centre',
            name='longitude',
            field=models.FloatField(null=True, blank=True),
        ),
        migrations.AddField(
            model_name='hdb_data',
            name='latitude',
            field=models.FloatField(null=True, blank=True),
        ),
        migrations.AddField(
            model_name='hdb_data',
            name='longitude',
            field=models.FloatField(null=True, blank=True),
        ),
    ]