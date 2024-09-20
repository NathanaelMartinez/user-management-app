// src/app/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserManagementPage from './pages/UserManagementPage';

const App: React.FC = () => {
  // TODO: remove dummy data after testing 
  const users = [
    { name: 'John Doe', email: 'john@example.com', lastLogin: '2023-09-15', status: 'Active' },
    { name: 'Jane Smith', email: 'jane@example.com', lastLogin: '2023-09-10', status: 'Blocked' },
    { name: 'Bob Johnson', email: 'bob@example.com', lastLogin: '2023-09-12', status: 'Active' },
  ];

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/users" element={<UserManagementPage users={users} />} />
      </Routes>
    </Router>
  );
};

export default App;
