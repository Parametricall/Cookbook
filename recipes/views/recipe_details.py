import ast
import json

from django.conf import settings
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt

from ..forms import CreateRecipeForm
from ..models import Recipe


class RecipeDetails(View):
    template_name = "recipes/recipe_details.html"

    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def get(self, request, recipe_id):
        recipe = Recipe.objects.get(id=recipe_id)
        ingredients = ast.literal_eval(recipe.ingredients)
        method = ast.literal_eval(recipe.method)

        context = {
            'debug': True,
            'recipeName': recipe.name,
            'ingredients': repr(json.dumps(ingredients)),
            'method': repr(json.dumps(method)),
            'extended_template': settings.BASE_WITH_HEADER_TEMPLATE
        }
        return render(request, self.template_name, context)

    def post(self, request, recipe_id):
        instance = Recipe.objects.get(id=recipe_id)
        body = json.loads(request.body)
        form = CreateRecipeForm(body, instance=instance)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect(reverse("recipes:Recipe Details",
                                                kwargs={"recipe_id": recipe_id}))
