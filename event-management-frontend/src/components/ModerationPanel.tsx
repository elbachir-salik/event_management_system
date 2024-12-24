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
    is_approved: boolean;
}

const ModerationPanel: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAllEvents = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem("accessToken");
                const response = await axios.get("http://127.0.0.1:8000/events/list/", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setEvents(response.data); // Fetch all events for moderators
            } catch (err) {
                console.error(err);
                setMessage("Failed to fetch events. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        
        fetchAllEvents();
    }, []);

    

    const handleApprove = async (eventId: number) => {
        try {
            const token = localStorage.getItem("accessToken");
            await axios.put(
                `http://127.0.0.1:8000/events/approve/${eventId}/`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setMessage(`Event ${eventId} approved successfully.`);
            setEvents((prevEvents) =>
                prevEvents.map((event) =>
                    event.id === eventId ? { ...event, is_approved: true } : event
                )
            );
        } catch (err) {
            console.error(err);
            setMessage("Failed to approve the event.");
        }
    };

    const handleReject = async (eventId: number) => {
        try {
            const token = localStorage.getItem("accessToken");
            await axios.put(
                `http://127.0.0.1:8000/events/reject/${eventId}/`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setMessage(`Event ${eventId} rejected successfully.`);
            setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
        } catch (err) {
            console.error(err);
            setMessage("Failed to reject the event.");
        }
    };

    return (
        <div>
            <h2>Moderation Panel</h2>
            {message && <p>{message}</p>}
            {loading ? (
                <p>Loading events...</p>
            ) : events.length === 0 ? (
                <p>No events available for moderation.</p>
            ) : (
                <ul>
                    {events.map((event) => (
                        <li key={event.id}>
                            <h3>{event.name}</h3>
                            <p>{event.description}</p>
                            <p>Date: {event.date}</p>
                            <p>Time: {event.time}</p>
                            <p>Location: {event.location}</p>
                            <p>Status: {event.is_approved ? "Approved" : "Pending"}</p>
                            {!event.is_approved && (
                                <div>
                                    <button onClick={() => handleApprove(event.id)}>Approve</button>
                                    <button onClick={() => handleReject(event.id)}>Reject</button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ModerationPanel;
