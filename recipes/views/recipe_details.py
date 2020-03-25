import ast

from django.conf import settings
from django.shortcuts import render
from django.views import View

from ..models import Recipe


class RecipeDetails(View):
    template_name = "recipes/recipe_details.html"

    def get(self, request, recipe_id):
        recipe = Recipe.objects.get(id=recipe_id)
        ingredients = ast.literal_eval(recipe.ingredients)
        method = ast.literal_eval(recipe.method)

        context = {
            'name': recipe.name,
            'ingredients': ingredients,
            'method': method,
            'extended_template': settings.BASE_WITH_HEADER_TEMPLATE
        }
        return render(request, self.template_name, context)
