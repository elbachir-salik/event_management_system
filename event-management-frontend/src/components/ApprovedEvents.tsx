import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardActions,
    Button,
    Grid,
    Alert,
    CircularProgress,
} from "@mui/material";

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
            console.log(response);
            // Update the event list to reflect available spots
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
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Approved Events
            </Typography>
            {message && <Alert severity="success">{message}</Alert>}
            {events.length === 0 ? (
                <Typography variant="h6" color="textSecondary">
                    No approved events available.
                </Typography>
            ) : (
                <Grid container spacing={3}>
                    {events.map((event) => (
                        <Grid item xs={12} sm={6} md={4} key={event.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {event.name}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        {event.description}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        Date: {event.date}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        Time: {event.time}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        Location: {event.location}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        Spots Available:{" "}
                                        {event.max_participants - event.tickets}/
                                        {event.max_participants}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        size="small"
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleBookTicket(event.id)}
                                        disabled={event.tickets >= event.max_participants}
                                    >
                                        {event.tickets >= event.max_participants
                                            ? "Sold Out"
                                            : "Book Ticket"}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default ApprovedEvents;
