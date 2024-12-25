import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    TextField,
    Typography,
    Container,
    Alert,
    IconButton,
    InputAdornment,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Register: React.FC = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("participant"); // Default role
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:8000/auth/register/", {
                username,
                email,
                password,
                role,
            });
            console.log(response.data)
            setMessage("Registration successful! You can now log in.");
            setError("")
            setTimeout(() =>{
                navigate("/login")
            }, 2000)
        } catch (err) {
            console.error(err);
            setMessage("Registration failed. Please try again.");
        }
    };

    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };


    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                {message && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                        {message}
                    </Alert>
                )}
                {error && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {error}
                    </Alert>
                )}
                <Box
                    component="form"
                    onSubmit={handleRegister}
                    noValidate
                    sx={{ mt: 3 }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type={showPassword ? "text" : "password"} // Dynamically toggle password visibility
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleTogglePassword}
                                        edge="end"
                                        aria-label="toggle password visibility"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="role-select-label">Role</InputLabel>
                        <Select
                            labelId="role-select-label"
                            id="role"
                            value={role}
                            label="Role"
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <MenuItem value="participant">Participant</MenuItem>
                            <MenuItem value="organizer">Organizer</MenuItem>
                            <MenuItem value="moderator">Moderator</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Register
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Register;