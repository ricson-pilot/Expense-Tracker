import React, { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from './Components/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Home from './Components/Home';
import Signup from './Components/Signup';
import HomePage from './Components/HomePage';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [userEmail, setUserEmail] = useState('');

  return (
    <GoogleOAuthProvider clientId="813992224170-iqfu37dp06v4hq93459fr2f4b4sleqc6.apps.googleusercontent.com">
      <ToastContainer
        position="botton-left"
        autoClose={3000} // Auto close after 3 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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