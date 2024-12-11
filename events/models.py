from django.db import models
from django.conf import settings
# Create your models here.

class Event(models.Model):
    name = models.CharField(max_length=20)
    description = models.TextField()
    date = models.DateField()
    time = models.TimeField()
    location = models.CharField(max_length=255)
    is_approved = models.BooleanField(default=False)
    max_participants = models.PositiveIntegerField()
    organizer = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="events"
    )

    def __str__(self):
        return self.name