from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.views import View

from ..models import Recipe
from ..forms import CreateRecipeForm


class CreateRecipe(View):
    template_name = "recipes/create_recipe.html"

    def post(self, request):
        form = CreateRecipeForm(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect(reverse('recipes:Landing Page'))

    def get(self, request):
        form = CreateRecipeForm()

        context = {
            'form': form,
        }
        return render(request, self.template_name, context)
