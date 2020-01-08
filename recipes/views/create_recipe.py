import json

from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt

from ..forms import CreateRecipeForm

from Cookbook.settings import DEBUG


class CreateRecipe(View):
    template_name = "frontend/index.html"

    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

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
            'debug': DEBUG,
        }
        return render(request, self.template_name, context)
