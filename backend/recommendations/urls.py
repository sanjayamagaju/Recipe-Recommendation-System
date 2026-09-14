from django.urls import path

from recommendations.views import RecommendationView

urlpatterns = [
    path('recommendations/', RecommendationView.as_view()),
]
