import React from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import CreateEvent from "../components/CreateEvent";
import ApprovedEvents from "../components/ApprovedEvents";
import ModerationPanel from "../components/ModerationPanel";
import EventAnalytics from "../components/EventAnalytics";

const Dashboard: React.FC = () => {
    const role = localStorage.getItem("userRole");

    const renderContent = () => {
        switch (role) {
            case "participant":
                return (
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="h4" gutterBottom>
                                Welcome, Participant!
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                Here are some events for you to explore and enjoy.
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <ApprovedEvents />
                        </Grid>
                    </Grid>
                );

            case "organizer":
                return (
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="h4" gutterBottom>
                                Welcome, Organizer!
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                Here are your event management tools and analytics.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" gutterBottom>
                                        Create New Event
                                    </Typography>
                                    <CreateEvent />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" gutterBottom>
                                        Event Analytics
                                    </Typography>
                                    <EventAnalytics />
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                );

            case "moderator":
                return (
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="h4" gutterBottom>
                                Welcome, Moderator!
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                Here are the events to review and analytics.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" gutterBottom>
                                        Moderation Panel
                                    </Typography>
                                    <ModerationPanel />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" gutterBottom>
                                        Event Analytics
                                    </Typography>
                                    <EventAnalytics />
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                );

            default:
                return (
                    <Typography variant="body1" color="error">
                        Role not recognized. Please contact support.
                    </Typography>
                );
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h3" gutterBottom>
                Dashboard
            </Typography>
            {renderContent()}
        </Box>
    );
};

export default Dashboard;
