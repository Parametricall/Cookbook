from django.shortcuts import render
from django.views import View


class LandingPage(View):
    template_name = "recipes/landing_page.html"

    def get(self, request):
        return render(request, self.template_name, {})
