import React, { useEffect, useState } from "react";
import axios from "axios";

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
                const response = await axios.get("http://127.0.0.1:8000/events/analytics/", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
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
        return <p>Loading analytics...</p>;
    }

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    return (
        <div>
            <h2>Event Analytics</h2>
            {analytics ? (
                <div>
                    <p>Total Bookings: {analytics.total_bookings}</p>
                    <h3>Most Popular Events:</h3>
                    <ul>
                        {analytics.most_popular_events.map((event, index) => (
                            <li key={index}>
                                {event.name} - {event.ticket_count} bookings
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>No analytics data available.</p>
            )}
        </div>
    );
};

export default EventAnalytics;
