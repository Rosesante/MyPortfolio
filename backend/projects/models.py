from django.db import models


class Project(models.Model):

    CATEGORY_CHOICES = [
        ('Web Development', 'Web Development'),
        ('AI & Machine Learning', 'AI & Machine Learning'),
        ('IoT', 'IoT'),
        ('Database', 'Database'),
        ('Other', 'Other'),
    ]

    STATUS_CHOICES = [
        ('Completed', 'Completed'),
        ('In Development', 'In Development'),
        ('Prototype', 'Prototype'),
        ('Planned', 'Planned'),
    ]

    name = models.CharField(max_length=200)

    description = models.TextField()

    category = models.CharField(
        max_length=100,
        choices=CATEGORY_CHOICES
    )

    technologies = models.TextField(
        help_text='Enter technologies separated by commas.'
    )

    status = models.CharField(
        max_length=50,
        choices=STATUS_CHOICES,
        default='In Development'
    )

    progress = models.PositiveIntegerField(
        default=0,
        help_text='Enter project progress from 0 to 100.'
    )

    image = models.ImageField(
        upload_to='projects/',
        blank=True,
        null=True
    )

    github_url = models.URLField(
        blank=True
    )

    live_url = models.URLField(
        blank=True
    )

    start_date = models.DateField(
        blank=True,
        null=True
    )

    end_date = models.DateField(
        blank=True,
        null=True
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
        return self.name