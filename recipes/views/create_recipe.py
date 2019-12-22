import json

from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.views import View

from ..forms import CreateRecipeForm


class CreateRecipe(View):
    template_name = "frontend/index.html"

    def post(self, request):
        body = json.loads(request.body)
        form = CreateRecipeForm(body)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect(reverse('recipes:Landing Page'))

    def get(self, request):
        form = CreateRecipeForm()
        context = {
            'form': form,
        }
        return render(request, self.template_name, context)
