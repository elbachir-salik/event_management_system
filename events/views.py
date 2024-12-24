from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Event
from .serializers import EventSerializer
from tickets.models import Ticket
from django.db.models import Count
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

class RejectEventView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, event_id):
        if request.user.role != 'moderator':
            return Response({"error":"Only moderators can reject events"}, status=status.HTTP_403_FORBIDDEN)
        
        try:
            event = Event.objects.get(id=event_id)
        except:
            return Response({"error":"Event Not Found"}, status=status.HTTP_404_NOT_FOUND)
        
        event.is_approved = False
        event.save()

        return Response({'message':f'Event {event.name} has been rejected'}, status=status.HTTP_200_OK)
    



        
class ListEventsView(APIView):
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = self.request.user

        if user.role == 'moderator':
            events =  Event.objects.all()
        
        elif user.role == 'organizer':
            events = Event.objects.filter(organizer=user)
        
        elif user.role == 'participant':
            events = Event.objects.filter(is_approved=True)
        else:
            events = Event.objects.none()

        serializer = self.serializer_class(events, many=True)
        return Response(serializer.data)
        

class EventAnalyticsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.role not in ['moderator','organizer']:
            return Response({'error':'Access denied. Only moderators or organizers can view analytics.'}, status=status.HTTP_403_FORBIDDEN)
        
        total_bookings = Ticket.objects.count()

        popular_events = Event.objects.annotate(
            ticket_count = Count('tickets')
        ).order_by('-ticket_count')[:5]


        data = {
            'total_bookings': total_bookings,
            'most_popular_events': [
                {
                    'name': event.name,
                    'ticket_count': event.ticket_count
                } for event in popular_events
            ]
        }

        return Response(data,status=status.HTTP_200_OK)
    