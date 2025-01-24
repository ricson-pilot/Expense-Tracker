import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../Components/Login';

test('renders login form', () => {
  render(
    <Router>
      <Login setUserEmail={() => {}} />
    </Router>
  );

  expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  expect(screen.getByText(/login/i)).toBeInTheDocument();
});

test('handles login button click', () => {
  const setUserEmail = jest.fn();
  render(
    <Router>
      <Login setUserEmail={setUserEmail} />
    </Router>
  );

  fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'password' } });
  fireEvent.click(screen.getByText(/login/i));

  expect(setUserEmail).toHaveBeenCalledWith('test@example.com');
});