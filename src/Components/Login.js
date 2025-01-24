import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import './Styles/Login.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUserEmail }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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

  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Password:', password);

    
    navigate('/home', { state: { email } });
    // Further processing like sending the email and password to the server, etc.
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
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </div>
  );
};

export default Login;