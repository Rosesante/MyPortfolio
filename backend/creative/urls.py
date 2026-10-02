from django.urls import path
from .views import CreativeWorkListView


urlpatterns = [
    path('', CreativeWorkListView.as_view(), name='creative-list'),
]