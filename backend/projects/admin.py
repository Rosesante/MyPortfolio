from django.contrib import admin
from .models import Project


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'category',
        'status',
        'progress',
        'featured',
        'start_date',
        'end_date',
    )

    list_filter = (
        'category',
        'status',
        'featured',
    )

    search_fields = (
        'name',
        'description',
        'technologies',
    )