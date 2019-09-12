from django.shortcuts import render
from django.views import View

from ..models import Recipe
from ..forms import CreateRecipeForm


class RecipeDetails(View):
    template_name = "recipes/recipe_details.html"

    # def post(self, request, recipe_id):
    #     recipe = Recipe.objects.get(id=recipe_id)
    #     form = CreateRecipeForm(recipe)
    #
    #     context = {
    #         'form': form,
    #     }
    #     return render(request, self.template_name, context)

    def get(self, request, recipe_id):
        recipe = Recipe.objects.get(id=recipe_id)
        form = CreateRecipeForm(instance=recipe)

        ingredients = recipe.ingredients.split(';')
        method = recipe.method.split(';')


        context = {
            'form': form,
            'ingredients': ingredients,
            'method': method,
        }
        return render(request, self.template_name, context)
