import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Button,
    CircularProgress,
    Alert,
} from "@mui/material";

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
                setEvents(response.data);
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
            setEvents((prevEvents) =>
                prevEvents.filter((event) => event.id !== eventId)
            );
        } catch (err) {
            console.error(err);
            setMessage("Failed to reject the event.");
        }
    };

    return (
        <Box
            sx={{
                maxWidth: "800px",
                margin: "0 auto",
                padding: 3,
                border: "1px solid #ccc",
                borderRadius: "8px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            }}
        >
            <Typography variant="h4" align="center" gutterBottom>
                Moderation Panel
            </Typography>
            {message && (
                <Alert severity="info" sx={{ marginBottom: 2 }}>
                    {message}
                </Alert>
            )}
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center">
                    <CircularProgress />
                </Box>
            ) : events.length === 0 ? (
                <Typography variant="body1" align="center">
                    No events available for moderation.
                </Typography>
            ) : (
                <List>
                    {events.map((event) => (
                        <ListItem key={event.id} divider>
                            <ListItemText
                                primary={event.name}
                                secondary={
                                    <>
                                        <Typography>Date: {event.date}</Typography>
                                        <Typography>Time: {event.time}</Typography>
                                        <Typography>Location: {event.location}</Typography>
                                        <Typography>
                                            Status: {event.is_approved ? "Approved" : "Pending"}
                                        </Typography>
                                    </>
                                }
                            />
                            {!event.is_approved && (
                                <ListItemSecondaryAction>
                                    <Button
                                        variant="contained"
                                        color="success"
                                        onClick={() => handleApprove(event.id)}
                                        sx={{ marginRight: 1 }}
                                    >
                                        Approve
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleReject(event.id)}
                                    >
                                        Reject
                                    </Button>
                                </ListItemSecondaryAction>
                            )}
                        </ListItem>
                    ))}
                </List>
            )}
        </Box>
    );
};

export default ModerationPanel;
