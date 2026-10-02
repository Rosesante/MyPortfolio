from django.contrib import admin
from .models import CreativeWork


@admin.register(CreativeWork)
class CreativeWorkAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'category',
        'tools',
        'featured',
        'created_at',
    )

    list_filter = (
        'category',
        'featured',
    )

    search_fields = (
        'title',
        'description',
        'tools',
    )