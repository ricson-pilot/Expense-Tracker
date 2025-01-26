import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import './Styles/Login.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUserEmail }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('jwtToken');

      if (token) {
        try {
          // Make a POST request to validate the token
          const response = await axios.post(
            'http://localhost:8080/validate-token', // Replace with your backend URL
            {}, // No body is needed for this request
            {
              headers: {
                Authorization: `Bearer ${token}`, // Include the JWT token in the header
              },
            }
          );

          // If the token is valid, navigate to /home
          if (response.status === 200) {
            navigate('/home', { state: response.data }); // Pass the response data as state
          }
        } catch (error) {
          // Handle errors (e.g., token expired or invalid)
          //console.error('Token validation failed:', error.response?.data?.error || error.message);
          console.log(error);

          // Clear the invalid token from localStorage
          //localStorage.removeItem('jwtToken');          // Uncoment once you are sure of your code

          // Redirect to the login page or show an error message
          //navigate('/login', { state: { error: 'Session expired. Please log in again.' } });
        }
      } else {
        // If no token is found, redirect to the login page
        navigate('/login');
      }
    };

    validateToken();
  }, [navigate]);

  const handleSuccess = (response) => {
    const decoded = jwtDecode(response.credential);
    const email = decoded.email;
    console.log('Login Success:', response);
    console.log('Email:', email);
    setUserEmail(email);
    
    navigate('/home', { state: { email } });
    // Further processing like sending the token to the server, etc.
  };

  const handleError = () => {
    console.log('Login Failed');
  };

  const handleLogin = async () => {
    console.log('Email:', email);
    console.log('Password:', password);
  
    try {
      const response = await fetch(`http://localhost:8080/api/v1/users/login?email=${encodeURIComponent(email)}&password=${password}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.status === 401) {
        alert('Password does not match. Please try again.');
        return;
      }
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('positive: Response:', data);
      const expenseLimitTemporaryVariable = data.expenseLimit;                   // Change expense limit here when working on home ok???
      // Store the JWT token in localStorage
      localStorage.setItem('jwtToken', data.token);

      navigate('/home', { state: { email, expenseLimitTemporaryVariable } });
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="login-input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="login-input"
      />
      <button onClick={handleLogin} className="login-button">Login</button>
      <p>Don't have an account? <a href="/signup">Signup</a></p>
      <hr className="separator" />
      <p>or</p>
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} 
        clientId = "813992224170-iqfu37dp06v4hq93459fr2f4b4sleqc6.apps.googleusercontent.com"
        buttonText="Login with Google"
        cookiePolicy="single_host_origin"
      />
    </div>
  );
};

export default Login;