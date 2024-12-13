from django.urls import path
from .views import CreateEventView, ApproveEventView, ListEventsView, RejectEventView,EventAnalyticsView


urlpatterns = [
    path('create/', CreateEventView.as_view(), name='create_event'),
    path('approve/<int:event_id>/', ApproveEventView.as_view(), name ='approve_event'),
    path('reject/<int:event_id>/', RejectEventView.as_view(), name ='reject_event'),
    path('list/', ListEventsView.as_view(), name ='list_events'),
    path('analytics/', EventAnalyticsView.as_view(), name='event_analytics')
    
]