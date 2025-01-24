import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const GoogleAuth = ({ setUserEmail }) => {
  const handleLoginSuccess = (response) => {
    const profile = response.getBasicProfile();
    const email = profile.getEmail();
    console.log('Email: ' + email);
    setUserEmail(email);
  };

  const handleLoginFailure = (error) => {
    console.log(error);
  };

  return (
    <div>
      <h2>Google Sign-In</h2>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginFailure}
      />
    </div>
  );
};

export default GoogleAuth;