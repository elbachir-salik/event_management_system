import React, { useEffect, useState } from "react";
import axios from "axios";

interface Event {
    id: number;
    name: string;
    description: string;
    date: string;
    time: string;
    location: string;
    max_participants: number;
    tickets: number; // Assuming the backend returns a count of booked tickets
}

const ApprovedEvents: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchApprovedEvents = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const response = await axios.get("http://127.0.0.1:8000/events/list/", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setEvents(response.data);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch approved events. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchApprovedEvents();
    }, []);

    const handleBookTicket = async (eventId: number) => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.post(
                `http://127.0.0.1:8000/tickets/book/${eventId}/`,
                {}, // No body needed for this request
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setMessage(`Successfully booked a ticket for event ID: ${eventId}`);
            console.log(response)
            // Optional: Update the event list to reflect available spots
            setEvents((prevEvents) =>
                prevEvents.map((event) =>
                    event.id === eventId
                        ? { ...event, tickets: event.tickets + 1 }
                        : event
                )
            );
        } catch (err) {
            console.error(err);
            setMessage("Failed to book a ticket. Please try again.");
        }
    };

    if (loading) {
        return <p>Loading approved events...</p>;
    }

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    return (
        <div>
            <h2>Approved Events</h2>
            {message && <p>{message}</p>}
            {events.length === 0 ? (
                <p>No approved events available.</p>
            ) : (
                <ul>
                    {events.map((event) => (
                        <li key={event.id}>
                            <h3>{event.name}</h3>
                            <p>{event.description}</p>
                            <p>Date: {event.date}</p>
                            <p>Time: {event.time}</p>
                            <p>Location: {event.location}</p>
                            <p>
                                Spots Available: {event.max_participants - event.tickets}/
                                {event.max_participants}
                            </p>
                            <button
                                onClick={() => handleBookTicket(event.id)}
                                disabled={event.tickets >= event.max_participants} >
                                {event.tickets >= event.max_participants
                                    ? "Sold Out"
                                    : "Book Ticket"}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ApprovedEvents;
