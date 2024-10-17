import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handle = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/', {
                username,
                password
            }, { withCredentials: true });

            setMessage(response.data);

            // Check for successful login based on your backend response
            if (response.data.success) { // Assuming your backend sends a success flag
                navigate('/about'); // Redirect to About page
            }
        } catch (error) {
            setMessage('Login failed. Please try again.');
            console.error('Error during login:', error);
        }
    };

    return (
        <div>
            <p className="title">
                "DesignGen: Harnessing AI for Custom Pattern Creation"
            </p>
            <div className="b">
                <form id="login-form" onSubmit={handle}>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Enter username"
                        required
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <a href="signup.html" className="a">Signup?</a>
                    <button id="button" type="submit">Login</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
}

export default Login;