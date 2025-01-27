import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import './Styles/Login.css';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from './apiConfig';

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
            `${API_BASE_URL}/users/validate-token`, // Replace with your backend URL
            {}, 
            {
              headers: {
                Authorization: `Bearer ${token}`, 
              },
            }
          );

          if (response.status === 200) {
            console.log("Login by token okkkk");
            const { token, name, email } = response.data;
            const expenseLimitTemporaryVariable = response.data.expenseLimit;
            console.log(response.data);
            navigate('/home', { state: { email, name, expenseLimitTemporaryVariable } });   
           localStorage.setItem('jwtToken', token);
          }
        } catch (error) {
          console.log("Error while validating toke: -> ",error);
        }
      } else {
        console.log("No token is found");
        navigate('/login');
      }
    };

    validateToken();
  }, [navigate]);

  const handleSuccess = async (response) => {
    const decoded = jwtDecode(response.credential);
    const email = decoded.email;
    console.log('Login Success:', response);
    console.log('Email:', email);
    // setUserEmail(email);                       // Changed at last uncomment and comment below line if error
    setEmail(email);

    try {
        const backendResponse = await axios.post(
          `${API_BASE_URL}/users/google-login?email=${email}`
        );

        const { token, name, expenseLimit } = backendResponse.data; 
        const expenseLimitTemporaryVariable = expenseLimit;
        // const expenseLimitTemporaryVariable = data.expenseLimit;  

        localStorage.setItem('jwtToken', token);

        navigate('/home', { state: { email, name, expenseLimitTemporaryVariable } });
    } catch (error) {
        console.error('Error logging in with Google:', error);
    }
};

  const handleError = () => {
    console.log('Login Failed');
  };

  const handleLogin = async () => {
    console.log('Email:', email);
    console.log('Password:', password);
  
    try {
      const response = await fetch(`${API_BASE_URL}/users/login?email=${encodeURIComponent(email)}&password=${password}`, {
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
      const expenseLimitTemporaryVariable = data.expenseLimit; 
      const name = data.name;                  // Change expense limit here when working on home ok???
     
      localStorage.setItem('jwtToken', data.token);

      navigate('/home', { state: { email, expenseLimitTemporaryVariable, name } });
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