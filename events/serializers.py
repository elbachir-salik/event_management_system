from rest_framework import serializers
from .models import Event

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id','description','date','time','location','max_participants', 'is_approved', 'organizer']
        read_only_fields = ['id', 'is_approved', 'organizer']