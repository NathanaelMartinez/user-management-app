import React, { useState, useEffect } from 'react';
import UserTable from '../components/userTable';
import UserInfo from '../components/userInfo';
import { fetchUsers } from '../services/api';
import { User } from '../models/User';

const UserManagementPage: React.FC = ( ) => {
  const [users, setUsers] = useState<User[]>([]);
  const userName = localStorage.getItem('userName') || 'Guest';

  useEffect(() => {
    const getUsers = async () => {
      try {
          const userData = await fetchUsers(); // call API to fetch users
          console.log('Feched users:', userData); // Log the fetched data
          setUsers(userData); // update state with fetched users data
      } catch (error) {
          console.error('Error fetching users:', error);
      }
    };

    getUsers();
  }, []);

  const handleLogout = () => {
    console.log("Logging out...");
    // TODO: implement logout logic
  };

  return (
    <div>
      <UserInfo name={userName} onLogout={handleLogout} />

      {users.length === 0 ? (
        <div>No users available.</div>
      ) : (
        <UserTable users={users} />
      )}
    </div>
  );
};

export default UserManagementPage;
