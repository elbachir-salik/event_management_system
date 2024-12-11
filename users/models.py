from django.db import models
from django.contrib.auth.models import  AbstractUser
# Create your models here.


class User(AbstractUser):
    ROLE_CHOICES = [
        ('organizer','Organizer'),
        ('participant','Participant'),
        ('moderator','Moderator'),
    ]

    role = models.CharField(max_length=20, choices= ROLE_CHOICES, default='participant')

    def __str__(self):
        return self.username
