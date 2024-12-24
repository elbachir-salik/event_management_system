import React from "react";
import CreateEvent from "../components/CreateEvent";


const Dashboard: React.FC = () => {
    const role = localStorage.getItem("userRole");


    const renderContent = () => {
        switch (role) {
            case "participant":
                return <p>Welcome, Participant! Here are some events for you.</p>;
            case "organizer":
                return (
                    <div>
                        <p>Welcome, Organizer! Here are your event management tools.</p>
                        <CreateEvent /> 
                    </div>
                );
            case "moderator":
                return <p>Welcome, Moderator! Here are the events to review.</p>;
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