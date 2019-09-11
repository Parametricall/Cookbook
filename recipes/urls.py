from django.urls import path

from .views.landing_page import LandingPage

urlpatterns = [
    path('', LandingPage.as_view(), name="Landing Page")
]