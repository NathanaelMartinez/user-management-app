import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from '../components/loginForm';
import { loginUser } from '../services/api';

const LoginPage: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLoginSubmit = async (email: string, password: string) => {
        console.log('Logging in with:', { email, password });
        try {
            const token = await loginUser({ email, password });
            console.log('Login successful, token:', token);
            navigate('/users'); // navigate to users page after login
        } catch (error) {
            if (error instanceof Error && error.message) {  
                console.error('Login failed:', error); // Use response data message
                setErrorMessage(`Error: ${error.message}`); // Set error message from backend
            } else {
                console.error('Unexpected error:', error);
                setErrorMessage('An unexpected error occurred.'); // General error message
            }
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow" style={{ width: '30rem' }}>
                <div className="card-body">
                    <h2 className="card-title text-center">Login</h2>
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    <LoginForm onSubmit={handleLoginSubmit} />
                    <p className="mt-3 text-center">
                        Don't have an account?{' '}
                        <Link to="/register">Click here to register</Link>
                    </p>
                </div>
            </div>
        </div>

    );
};

export default LoginPage;
