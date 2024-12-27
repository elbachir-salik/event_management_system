import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    TextField,
    Typography,
    Alert,
    Grid,
} from "@mui/material";

const CreateEvent: React.FC = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [location, setLocation] = useState("");
    const [maxParticipants, setMaxParticipants] = useState(0);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleCreateEvent = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("accessToken");

            await axios.post(
                "http://127.0.0.1:8000/events/create/",
                {
                    name,
                    description,
                    date,
                    time,
                    location,
                    max_participants: maxParticipants,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setMessage("Event created successfully!");
            navigate("/dashboard"); // Redirect back to dashboard after success
        } catch (err) {
            console.error(err);
            setMessage("Failed to create event. Please try again.");
        }
    };

    return (
        <Box
            sx={{
                maxWidth: "600px",
                margin: "0 auto",
                padding: 3,
                border: "1px solid #ccc",
                borderRadius: "8px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            }}
        >
            <Typography variant="h4" align="center" gutterBottom>
                Create Event
            </Typography>
            {message && <Alert severity={message.includes("success") ? "success" : "error"}>{message}</Alert>}
            <form onSubmit={handleCreateEvent}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Event Name"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Description"
                            fullWidth
                            multiline
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Date"
                            type="date"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Time"
                            type="time"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Location"
                            fullWidth
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Max Participants"
                            type="number"
                            fullWidth
                            value={maxParticipants}
                            onChange={(e) => setMaxParticipants(Number(e.target.value))}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} textAlign="center">
                        <Button type="submit" variant="contained" color="primary">
                            Create Event
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default CreateEvent;
