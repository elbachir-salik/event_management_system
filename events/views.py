from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Event
from .serializers import EventSerializer
# Create your views here.

class CreateEventView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self,request):
        if request.user.role != 'organizer':
            return Response({'error':'Only organizers can create events'}, status=status.HTTP_403_FORBIDDEN)
        
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(organizer=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ApproveEventView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, event_id):
        if request.user.role != 'moderator':
            return Response({"error":"Only moderators can approve events"}, status=status.HTTP_403_FORBIDDEN)
        
        try:
            event = Event.objects.get(id=event_id)
        except:
            return Response({"error":"Event Not Found"}, status=status.HTTP_404_NOT_FOUND)
        
        event.is_approved = True
        event.save()

        return Response({'message':f'Event {event.name} has been approved'}, status=status.HTTP_200_OK)
    
        
