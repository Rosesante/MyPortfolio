from django.urls import path

from .views import (
    ProfileListView,
    SkillListView,
    EducationListView,
    ExperienceListView,
)


urlpatterns = [
    path('profile/', ProfileListView.as_view(), name='profile'),
    path('skills/', SkillListView.as_view(), name='skills'),
    path('education/', EducationListView.as_view(), name='education'),
    path('experience/', ExperienceListView.as_view(), name='experience'),
]