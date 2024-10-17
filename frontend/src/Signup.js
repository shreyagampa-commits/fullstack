
// SignupForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message,setMessage]=useState('')
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/signup', {
        username,
        password,
        email,
        phoneNumber,
      });
      setMessage('Signup successful!');
    } catch (error) {
      setMessage('Signup failed. Please try again.');
    }
  };

  return (
   
    <form onSubmit={handleSubmit} className="signup-form">
    <input
      className="username"
      type="text"
      placeholder="Username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      required
    />
    <input
      className="password"
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />
    <input
      className="email"
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />
    <input
      className="phone"
      type="text"
      placeholder="Phone Number"
      value={phoneNumber}
      onChange={(e) => setPhoneNumber(e.target.value)}
    />
    <button className="button" type="submit">Sign Up</button>
    {message && <p className="message">{message}</p>}
  </form>
  
  );
};

export default SignupForm;