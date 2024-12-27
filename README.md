# Event Management System

## Overview

The **Event Management System** is a full-stack web application designed to manage and participate in events. This project features a backend built with Django REST Framework (DRF) and a frontend developed using React with TypeScript and Vite. The system includes user authentication, role-based access control, event creation and booking, and moderation features.

---

## Features

### **User Management**
- **Roles**:
  - **Organizer**: Can create and manage events.
  - **Participant**: Can view and book approved events.
  - **Moderator**: Can approve or reject pending events.
- **Authentication**:
  - JWT-based secure login and registration.

### **Event Management**
- Create, update, and delete events (Organizer only).
- Approve or reject events (Moderator only).
- List all approved events (Participants).

### **Ticket Booking**
- Participants can book tickets for approved events.
- Automatic capacity management to prevent overbooking.

### **Analytics (Optional)**
- Total bookings.
- Most popular events.

### **Frontend**
- Built with React, TypeScript, and Vite.
- Uses Material-UI for a modern, responsive user interface.
- Role-based dashboards for personalized experiences.

---

## Technologies

### Backend
- **Framework**: Django REST Framework
- **Database**: PostgreSQL
- **Authentication**: JWT (via `django-rest-framework-simplejwt`)

### Frontend
- **Framework**: React with TypeScript
- **Build Tool**: Vite
- **UI Library**: Material-UI (MUI)

---

## Setup and Installation

### Backend
1. Clone the repository and navigate to the backend folder:
    
    git clone https://github.com/elbachir-salik/event_management_system.git
    cd event_management
   
2. Create a virtual environment and install dependencies:
    
    python -m venv venv
    venv\Scripts\activate
    pip install -r requirements.txt
    
3. Configure PostgreSQL in the `settings.py` file.
4. Run migrations and start the development server:
    
    python manage.py makemigrations


    python manage.py migrate


    python manage.py runserver
    

### Frontend
1. Navigate to the frontend folder:
    
    cd event-management-frontend
    
2. Install dependencies:
    
    npm install
    
3. Start the development server:
   
    npm run dev
    

---

## Usage

### Endpoints
- **Authentication**:
  - `POST /auth/register/`: Register a new user.
  - `POST /auth/login/`: Login and obtain access and refresh tokens.
- **Events**:
  - `POST /events/create/`: Create an event (Organizer only).
  - `GET /events/list/`: List events based on role.
  - `PUT /events/approve/{id}/`: Approve an event (Moderator only).
  - `PUT /events/reject/{id}/`: Reject an event (Moderator only).
- **Tickets**:
  - `POST /tickets/book/{event_id}/`: Book a ticket for an event (Participant only).
  - `DELETE /tickets/cancel/{ticket_id}/`: Cancel a ticket booking.
- **Analytics**:
  - `GET /events/analytics/`: View event analytics (Moderator/Organizer).
