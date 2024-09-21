import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserTable from '../components/userTable';
import UserInfo from '../components/userInfo';
import { fetchUsers } from '../services/api';
import { User } from '../models/User';
import axios from 'axios';

const UserManagementPage: React.FC = ( ) => {
  const [users, setUsers] = useState<User[]>([]);
  const userName = localStorage.getItem('userName') || 'Guest';
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token'); // check for token
    if (!token) {
      navigate('/login'); // redirect to login if no token
    }
  },[navigate]); // depend on navigate to avoid stale closures

  useEffect(() => {
    const getUsers = async () => {
      try {
          const userData = await fetchUsers();
          console.log('Feched users:', userData);
          setUsers(userData); // update state with fetched users data
      } catch (error) {
        if (axios.isAxiosError(error)) {  
          if (error.message === 'Account is blocked or deleted') {
            console.error('User account is blocked or deleted. Redirecting to login...');
            navigate('/login'); // redirect on blocked or deleted account
          } else {
            console.error('Error fetching users:', error.message);
          }
        }
      }
    };
    getUsers();
  },[navigate]);

  const refreshUserList = async () => {
    try {
      const userData = await fetchUsers();
      setUsers(userData);
    } catch (error) {
      console.error('Error refreshing users:', error);
    }
  };
  
  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem('token'); // remove token from local storage
    localStorage.removeItem('userName');
    navigate('/login');
  };

  return (
    <div>
      <UserInfo name={userName} onLogout={handleLogout} />

      {users.length === 0 ? (
        <div>No users available.</div>
      ) : (
        <UserTable users={users} onRefresh={refreshUserList}/>
      )}
    </div>
  );
};

export default UserManagementPage;
