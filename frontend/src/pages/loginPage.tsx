import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from '../components/loginForm';
import { loginUser } from '../services/api';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginSubmit = async (email: string, password: string) => {
    console.log('Logging in with:', { email, password });
    try {
        const token = await loginUser({ email, password });
        console.log('Login successful, token:', token);
        navigate('/users'); // navigate to users page after login
    } catch (error) {
        console.error('Login failed:', error);
    }
  };

  return (
    <div className='login-container'>
      <h2>Login</h2>
      <LoginForm onSubmit={handleLoginSubmit} />
      <p>
        Don't have an account?{' '}
        <Link to="/register">Click here to register</Link>
      </p>
    </div>
  );
};

export default LoginPage;
