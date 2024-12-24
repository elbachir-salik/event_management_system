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

    if (loading) {
        return <p>Loading approved events...</p>;
    }

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    return (
        <div>
            <h2>Approved Events</h2>
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
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ApprovedEvents;
