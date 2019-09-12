from django.urls import path

from .views.landing_page import LandingPage
from .views.create_recipe import CreateRecipe

app_name = "recipes"
urlpatterns = [
    path('', LandingPage.as_view(), name="Landing Page"),
    path("create_recipe/", CreateRecipe.as_view(), name="Create Recipe"),
]