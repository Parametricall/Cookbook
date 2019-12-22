from django.urls import path

from .views.landing_page import LandingPage
from .views.create_recipe import CreateRecipe
from .views.recipe_details import RecipeDetails

app_name = "recipes"
urlpatterns = [
    path('', LandingPage.as_view(), name="Landing Page"),
    path("create_recipe/", CreateRecipe.as_view(), name="Create Recipe"),
    path('recipe_details/<int:recipe_id>/', RecipeDetails.as_view(), name="Recipe Details"),
]
