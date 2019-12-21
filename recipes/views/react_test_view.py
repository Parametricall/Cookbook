from django.http import JsonResponse, HttpResponseRedirect
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from django.views import View
from django.utils.decorators import method_decorator
import json

from recipes.forms import CreateRecipeForm


class ReactTestView(View):
    template_name = "frontend/index.html"

    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def get(self, request):
        context = {
                    'num__squares': 6
                }
        return render(request, self.template_name, context)

    def post(self, request):
        body = json.loads(request.body)
        name = body.get('name', "")
        ingredients = body.get('ingredients', "")
        method = body.get('method', "")


        form = CreateRecipeForm(body)
        if form.is_valid():
            form.save()
            # return JsonResponse({
            #     'url': reverse('recipes:Landing Page')
            # })

            return HttpResponseRedirect(reverse('recipes:Landing Page'))
