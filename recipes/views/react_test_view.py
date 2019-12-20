from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from django.views import View
from django.utils.decorators import method_decorator
import json


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
        a = json.loads(request.body)
        context = {
            'num_squares' : a['answer'],
        }
        return JsonResponse(context)
