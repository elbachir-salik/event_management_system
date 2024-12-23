import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:8000/auth/login/", {
                username,
                password,
            });
            console.log("Backend Response:", response.data);
            const {access, refresh, role} = response.data; 
            localStorage.setItem("accessToken", access);
            localStorage.setItem("refreshToken", refresh);
            localStorage.setItem("userRole", role);
            console.log("User Role:", role);


            if(role === "participant") navigate("/dashboard/participant")
            else if (role === "organizer") navigate("/dashboard/organizer")
            else if (role === "moderator") navigate("/dashboard/moderator")

            alert("Login successful!");
        } catch (err) {
            console.error(err);
            setError("Invalid username or password!");
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </div>
    );
};

export default Login;
