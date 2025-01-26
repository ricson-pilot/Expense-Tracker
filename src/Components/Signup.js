import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Styles/Signup.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [expenseLimit, setExpenseLimit] = useState(10000); // Default value
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const userData = {
      name: name,
      email: email,
      password: password,
      expenseLimit: expenseLimit
    };

    try {
      const response = await axios.post('http://localhost:8080/api/v1/users', userData);
      console.log('Response:', response.data);
      alert('Account created successfully...');
      navigate('/login');
    } catch (error) {
      console.error('Error:', error);
      alert('Error creating account. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <h1>Signup</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="signup-input"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="signup-input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="signup-input"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="signup-input"
      />
      <input
        type="number"
        placeholder="Expense Limit"
        value={expenseLimit}
        onChange={(e) => setExpenseLimit(e.target.value)}
        className="signup-input"
      />
      <button onClick={handleSignup} className="signup-button">Signup</button>
    </div>
  );
};

export default Signup;