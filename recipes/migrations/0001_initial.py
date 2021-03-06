# Generated by Django 2.2.5 on 2019-09-12 09:45
from django.db import migrations, models
from recipes.models import Recipe


def create_initial_recipe(apps, schema_editor):
    if apps and schema_editor:
        pass

    stir_fry = Recipe(
        name="The Hamilton Stir Fry",
        ingredients=[
            "1x Woolworth's packet stir fry",
            "3x small meat patties",
            "1/4 salami",
            "1x Masterfood quick and easy packet sauce (honey mustard, tuscan meatballs, etc)"
        ],
        method=[
            "Start by cooking burgers and salami in frypan until safe to eat",
            "Add stir fry and leave for a couple minutes",
            "Add sauce and leave for extra couple minutes (stir every so often)",
            "Serve up"
        ]
    )

    stir_fry.save()


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Recipe',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True,
                                        serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('ingredients', models.TextField()),
                ('method', models.TextField()),
            ],
        ),

        # migrations.RunPython(create_initial_recipe)
    ]
