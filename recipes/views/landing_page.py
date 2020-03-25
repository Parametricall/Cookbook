from django.shortcuts import render
from django.views import View
from django.conf import settings

from ..models import Recipe


class LandingPage(View):
    template_name = "recipes/landing_page.html"

    def get(self, request):
        recipes = Recipe.objects.all()
        context = {
            'recipes': recipes,
            'extended_template': settings.BASE_WITH_HEADER_TEMPLATE
        }
        return render(request, self.template_name, context)
