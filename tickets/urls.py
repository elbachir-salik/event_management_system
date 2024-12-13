from django.urls import path
from .views import BookTicketView, CancelTicketView

urlpatterns = [
    path('book/<int:event_id>/', BookTicketView.as_view(), name='book_ticket'),
    path('cancel/<int:ticket_id>/', CancelTicketView.as_view(), name='cancel_ticket'),
]
