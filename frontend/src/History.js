import React, { useEffect, useState } from 'react';
import axios from 'axios';

function History() {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/history', { withCredentials: true })
            .then(response => {
                console.log('Response from backend:', response.data);
                
                if (response.data.message === 'no user logged in') {
                    setMessage('No user is logged in.');
                    setUser(null); // Clear user data
                } else {
                    setUser(response.data); // Set user data
                    setMessage(''); // Clear previous messages
                }
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                setMessage('Error fetching user data');
                setUser(null); // Clear user data on error
            });
    }, []);

    return (
        <div>
            <h1>History</h1>
            {message && <p>{message}</p>}
            {user ? (
                <div>
                    <h2>User Details</h2>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>

                    <h3>Uploaded Images</h3>
                    {user.images.length > 0 ? (
                        <ul>
                            {user.images.map((image, index) => (
                                <li key={index}>
                                    <img 
                                        src={image.data} 
                                        alt={`Uploaded ${index + 1}`} 
                                        style={{ width: '100px', height: '100px' }} 
                                    />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No images uploaded.</p>
                    )}
                </div>
            ) : (
                <p>No user data available.</p> // Fallback message if user is null
            )}
        </div>
    );
}

export default History;
