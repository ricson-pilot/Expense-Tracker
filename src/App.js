import React, { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from './Components/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Signup from './Components/Signup';
import HomePage from './Components/HomePage';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [userEmail, setUserEmail] = useState('');

  

  return (
    <GoogleOAuthProvider clientId="813992224170-iqfu37dp06v4hq93459fr2f4b4sleqc6.apps.googleusercontent.com">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login setUserEmail={setUserEmail} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;