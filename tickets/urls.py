from django.urls import path
from .views import BookTicketView

urlpatterns = [
    path('book/<int:event_id>/', BookTicketView.as_view(), name='book_ticket'),
]
