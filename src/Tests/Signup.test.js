import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Signup from '../Components/Signup';

test('renders signup form', () => {
  render(
    <Router>
      <Signup />
    </Router>
  );

  expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/confirm password/i)).toBeInTheDocument();
  expect(screen.getByText(/signup/i)).toBeInTheDocument();
});

test('handles signup button click', () => {
  render(
    <Router>
      <Signup />
    </Router>
  );

  fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'password' } });
  fireEvent.change(screen.getByPlaceholderText(/confirm password/i), { target: { value: 'password' } });
  fireEvent.click(screen.getByText(/signup/i));

  // Add your assertions here
});