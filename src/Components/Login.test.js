import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

// Mock axios
jest.mock('axios');

// Mock GoogleLogin component
jest.mock('@react-oauth/google', () => ({
  GoogleLogin: jest.fn(({ onSuccess, onError }) => (
    <button onClick={() => onSuccess({ credential: 'mock-credential' })}>Google Login</button>
  )),
}));

describe('Login Component', () => {
  let navigateMock;

  beforeEach(() => {
    navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);
    localStorage.clear();
  });

  test('renders login form', () => {
    render(<Login />);
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('or')).toBeInTheDocument();
    expect(screen.getByText('Google Login')).toBeInTheDocument();
  });

  test('handles email and password input changes', () => {
    render(<Login />);
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  test('handles login with email and password', async () => {
    axios.post.mockResolvedValueOnce({
      data: {
        token: 'mock-token',
        name: 'Test User',
        expenseLimit: 1000,
      },
    });

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        `${API_BASE_URL}/users/login?email=test%40example.com&password=password123`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      expect(localStorage.getItem('jwtToken')).toBe('mock-token');
      expect(navigateMock).toHaveBeenCalledWith('/home', {
        state: {
          email: 'test@example.com',
          expenseLimitTemporaryVariable: 1000,
          name: 'Test User',
        },
      });
    });
  });

  test('handles Google login success', async () => {
    axios.post.mockResolvedValueOnce({
      data: {
        token: 'mock-token',
        name: 'Test User',
        expenseLimit: 1000,
      },
    });

    render(<Login />);

    fireEvent.click(screen.getByText('Google Login'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        `${API_BASE_URL}/users/google-login?email=undefined`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      expect(localStorage.getItem('jwtToken')).toBe('mock-token');
      expect(navigateMock).toHaveBeenCalledWith('/home', {
        state: {
          email: undefined,
          expenseLimitTemporaryVariable: 1000,
          name: 'Test User',
        },
      });
    });
  });

  test('handles token validation on mount', async () => {
    localStorage.setItem('jwtToken', 'mock-token');
    axios.post.mockResolvedValueOnce({
      data: {
        token: 'mock-token',
        name: 'Test User',
        email: 'test@example.com',
        expenseLimit: 1000,
      },
    });

    render(<Login />);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        `${API_BASE_URL}/users/validate-token`,
        {},
        {
          headers: {
            Authorization: 'Bearer mock-token',
          },
        }
      );
      expect(navigateMock).toHaveBeenCalledWith('/home', {
        state: {
          email: 'test@example.com',
          expenseLimitTemporaryVariable: 1000,
          name: 'Test User',
        },
      });
    });
  });

  test('handles token validation failure on mount', async () => {
    localStorage.setItem('jwtToken', 'mock-token');
    axios.post.mockRejectedValueOnce(new Error('Token validation failed'));

    render(<Login />);

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('/login');
    });
  });
});