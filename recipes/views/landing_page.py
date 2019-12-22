from django.shortcuts import render
from django.views import View

from ..models import Recipe


class LandingPage(View):
    template_name = "recipes/landing_page.html"

    def get(self, request):
        recipes = Recipe.objects.all()
        context = {
            'recipes': recipes,
        }
        return render(request, self.template_name, context)
