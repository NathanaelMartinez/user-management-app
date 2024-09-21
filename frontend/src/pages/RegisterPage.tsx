import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterForm from '../components/registerForm';
import { loginUser, registerUser } from '../services/api';


const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const handleRegisterSubmit = async (name: string, email: string, password: string) => {
    try {
      await registerUser({ name, email, password }); // call register function
      console.log('Registration successful');

      // Now log in
      const token = await loginUser({ email, password });
      console.log('Login successful, token:', token);

      navigate('/users'); // navigate to table after successful registration
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className='login-container'>
      <h2>Register</h2>
      <RegisterForm onSubmit={handleRegisterSubmit} />
      <p>
        Already have an account?{' '}
        <Link to="/login">Click here to go to login screen</Link>
      </p>
    </div>
  );
};

export default RegisterPage;