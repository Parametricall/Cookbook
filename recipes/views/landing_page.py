from django.forms import modelformset_factory
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.views import View
from django.conf import settings

from ..models import Recipe


class LandingPage(View):
    template_name = "recipes/landing_page.html"

    def get(self, request):
        formset = modelformset_factory(Recipe, fields=("name",),
                                       can_delete=True, extra=0)
        recipes = Recipe.objects.all()
        context = {
            "formset": formset,
            'recipes': recipes,
            'extended_template': settings.BASE_WITH_HEADER_TEMPLATE
        }
        return render(request, self.template_name, context)

    def post(self, request):
        to_delete_recipes = request.POST.getlist("recipe_delete_checkbox")
        for recipe_id in to_delete_recipes:
            recipe = Recipe.objects.get(id=recipe_id)
            recipe.delete()

        return HttpResponseRedirect(reverse('recipes:Landing Page'))

