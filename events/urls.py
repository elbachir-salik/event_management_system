from django.urls import path
from .views import CreateEventView, ApproveEventView, ListEventsView


urlpatterns = [
    path('create/', CreateEventView.as_view(), name='create_event'),
    path('approve/<int:event_id>/', ApproveEventView.as_view(), name ='approve_event'),
    path('list/', ListEventsView.as_view(), name ='list_events'),
]