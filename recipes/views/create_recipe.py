from django.shortcuts import render
from django.views import View

from ..models import Recipe
from ..forms import CreateRecipeForm


class CreateRecipe(View):
    template_name = "recipes/create_recipe.html"

    def get(self, request):
        form = CreateRecipeForm()

        context = {
            'form': form,
        }
        return render(request, self.template_name, context)
