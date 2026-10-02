from django.db import models


class CreativeWork(models.Model):

    CATEGORY_CHOICES = [
        ('Photography', 'Photography'),
        ('Graphic Design', 'Graphic Design'),
        ('UI/UX Design', 'UI/UX Design'),
        ('Multimedia', 'Multimedia'),
        ('Other', 'Other'),
    ]

    title = models.CharField(max_length=200)

    description = models.TextField()

    category = models.CharField(
        max_length=100,
        choices=CATEGORY_CHOICES
    )

    image = models.ImageField(
        upload_to='creative/',
        blank=True,
        null=True
    )

    tools = models.CharField(
        max_length=255,
        blank=True,
        help_text='Enter tools used, separated by commas.'
    )

    project_url = models.URLField(
        blank=True
    )

    featured = models.BooleanField(
        default=False
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return self.title