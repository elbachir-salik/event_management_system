import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        <div>
            <h1>Create Event</h1>
            <form onSubmit={handleCreateEvent}>
                <div>
                    <label>Event Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Date:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Time:</label>
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Location:</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Max Participants:</label>
                    <input
                        type="number"
                        value={maxParticipants}
                        onChange={(e) => setMaxParticipants(Number(e.target.value))}
                        required
                    />
                </div>
                <button type="submit">Create Event</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CreateEvent;
