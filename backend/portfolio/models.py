from django.db import models


class Profile(models.Model):
    name = models.CharField(max_length=150)
    title = models.CharField(max_length=150)
    bio = models.TextField()
    email = models.EmailField()
    phone = models.CharField(max_length=50, blank=True)
    location = models.CharField(max_length=150, blank=True)
    profile_image = models.ImageField(
        upload_to='profile/',
        blank=True,
        null=True
    )
    github_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    cv = models.FileField(
        upload_to='cv/',
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Skill(models.Model):
    CATEGORY_CHOICES = [
        ('Software Development', 'Software Development'),
        ('AI & Data', 'AI & Data'),
        ('Database', 'Database'),
        ('Design & Creative', 'Design & Creative'),
        ('Tools', 'Tools'),
    ]

    name = models.CharField(max_length=100)
    category = models.CharField(
        max_length=100,
        choices=CATEGORY_CHOICES
    )
    description = models.TextField(blank=True)
    proficiency = models.PositiveIntegerField(
        default=0,
        help_text='Enter a value from 0 to 100.'
    )

    def __str__(self):
        return self.name


class Education(models.Model):
    institution = models.CharField(max_length=200)
    program = models.CharField(max_length=200)
    level = models.CharField(max_length=100, blank=True)
    description = models.TextField(blank=True)
    start_year = models.PositiveIntegerField()
    end_year = models.PositiveIntegerField(
        blank=True,
        null=True
    )
    current = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.institution} - {self.program}'


class Experience(models.Model):
    organization = models.CharField(max_length=200)
    position = models.CharField(max_length=150)
    description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField(
        blank=True,
        null=True
    )
    current = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.position} - {self.organization}'