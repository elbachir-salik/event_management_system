from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Ticket
from events.models import Event
# Create your views here.


class BookTicketView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, event_id):

        if request.user.role != 'participant':
            return Response({'error':'Only Participant can book tickets'}, status=status.HTTP_403_FORBIDDEN)
        
        try:
            event = Event.objects.get(id = event_id, is_approved=True)
        except:
            return Response({'error':f'Event with id "{event_id}" Not found or not approved'}, status=status.HTTP_404_NOT_FOUND)

        if event.tickets.count() >= event.max_participants:
            return Response({'error':'Event is fully booked'})

        ticket = Ticket.objects.create(user = request.user, event=event)
        return Response({'message':f'Ticket booked for event "{event.name}".'}, status=status.HTTP_201_CREATED)
    

class CancelTicketView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, ticket_id):
        try:
            ticket = Ticket.objects.get(id= ticket_id, user=request.user)
        
        except Ticket.DoesNotExist:
            return Response({'error':'Ticket Not found'}, status=status.HTTP_404_NOT_FOUND)
        
        event_name = ticket.event.name
        ticket.delete()
        return Response({'message':f'Your ticket for the event "{event_name}" has been canceled'}, status=status.HTTP_200_OK)
    