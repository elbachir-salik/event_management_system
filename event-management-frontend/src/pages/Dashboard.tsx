import React from "react";
import CreateEvent from "../components/CreateEvent";
import ApprovedEvents from "../components/ApprovedEvents";
import ModerationPanel from "../components/ModerationPanel";

const Dashboard: React.FC = () => {
    const role = localStorage.getItem("userRole");


    const renderContent = () => {
        switch (role) {
            case "participant":
                return (
                    <div>
                        <p>Welcome, Participant! Here are some events for you.</p>
                        <ApprovedEvents /> 
                    </div>
                );
            case "organizer":
                return (
                    <div>
                        <p>Welcome, Organizer! Here are your event management tools.</p>
                        <CreateEvent /> 
                    </div>
                );
            case "moderator":
                return (
                    <div>
                        <p>Welcome, Moderator! Here are the events to review.</p>
                        <ModerationPanel />
                    </div>
                );
            default:
                return <p>Role not recognized. Please contact support.</p>;
        }
    };

    return(
        <div>
            <h1>Dashboard</h1>
            {renderContent()}
        </div>
    );
};

export default Dashboard;