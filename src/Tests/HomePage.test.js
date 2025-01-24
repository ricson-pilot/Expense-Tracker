import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import HomePage from '../Components/HomePage';

test('renders home page', () => {
  render(
    <Router>
      <HomePage />
    </Router>
  );

  expect(screen.getByText(/expense tracker/i)).toBeInTheDocument();
  expect(screen.getByText(/track your expenses effortlessly and efficiently/i)).toBeInTheDocument();
  expect(screen.getByText(/login/i)).toBeInTheDocument();
  expect(screen.getByText(/signup/i)).toBeInTheDocument();
});