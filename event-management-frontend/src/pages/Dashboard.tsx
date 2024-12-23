import React from "react";


const Dashboard: React.FC = () => {
    const role = localStorage.getItem("userRole");

    console.log("User Role in Dashboard:", role);

    return(
        <div>
            <h1>Dashboard</h1>
            {role === "participant" && <p>Welcome, Participant ! Here are some events for you.</p>}
            {role === "organizer" && <p>Welcome, Organizer! Here are your event management tools.</p>}
            {role === "moderator" && <p>Welcome, Moderator! Here are the events to review.</p>}

        </div>
    );
};

export default Dashboard;