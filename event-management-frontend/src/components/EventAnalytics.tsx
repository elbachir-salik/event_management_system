import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Box,
    Typography,
    CircularProgress,
    Alert,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";

interface AnalyticsData {
    total_bookings: number;
    most_popular_events: { name: string; ticket_count: number }[];
}

const EventAnalytics: React.FC = () => {
    const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const response = await axios.get(
                    "http://127.0.0.1:8000/events/analytics/",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setAnalytics(response.data);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch analytics. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

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
                Event Analytics
            </Typography>
            {analytics ? (
                <Box>
                    <Typography variant="h6">
                        Total Bookings: {analytics.total_bookings}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Most Popular Events:
                    </Typography>
                    <List>
                        {analytics.most_popular_events.map((event, index) => (
                            <ListItem key={index} divider>
                                <ListItemText
                                    primary={event.name}
                                    secondary={`Bookings: ${event.ticket_count}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            ) : (
                <Typography variant="body1" align="center">
                    No analytics data available.
                </Typography>
            )}
        </Box>
    );
};

export default EventAnalytics;
