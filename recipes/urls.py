from django.urls import path

from .views.landing_page import LandingPage
from .views.create_recipe import CreateRecipe
from .views.recipe_details import RecipeDetails
from .views.react_test_view import ReactTestView
app_name = "recipes"
urlpatterns = [
    path('', LandingPage.as_view(), name="Landing Page"),
    path("create_recipe/", CreateRecipe.as_view(), name="Create Recipe"),
    path('recipe_details/<int:recipe_id>/', RecipeDetails.as_view(), name="Recipe Details"),
    path('react', ReactTestView.as_view(), name='React Test View'),
]