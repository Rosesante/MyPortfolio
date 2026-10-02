from django.contrib import admin
from .models import Profile, Skill, Education, Experience


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('name', 'title', 'email', 'location')


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'proficiency')
    list_filter = ('category',)


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = (
        'institution',
        'program',
        'start_year',
        'end_year',
        'current',
    )


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = (
        'organization',
        'position',
        'start_date',
        'end_date',
        'current',
    )