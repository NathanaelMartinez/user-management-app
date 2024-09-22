import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserTable from '../components/userTable';
import UserInfo from '../components/userInfo';
import { deleteUsers, fetchUsers, updateUserStatus } from '../services/api';
import { User } from '../models/User';
import axios from 'axios';
import Toolbar from '../components/toolbar';

const UserManagementPage: React.FC = ( ) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<boolean[]>([]);
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
          setSelectedUsers(Array(userData.length).fill(false));
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
          setSelectedUsers(Array(userData.length).fill(false));
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

  const handleBlockSelectedUsers = async () => {
    const usersToBlock = users.filter((_, index) => selectedUsers[index]).map(user => user.id);
    if (usersToBlock.length === 0) {
        console.log('No users selected for blocking.');
        return;
    }

    try {
        await updateUserStatus({ userIds: usersToBlock, action: 'block' });
        console.log('Users blocked successfully.');

        const currentUserId = parseInt(localStorage.getItem('userId') || '0');
        if (usersToBlock.includes(currentUserId)) {
            console.log('You have blocked yourself. Logging out...');
            handleLogout();
            return;
        }
        refreshUserList(); // refresh user list if not blocking self
    } catch (error) {
        console.error('Error blocking users:', error);
    }
};

const handleUnblockSelectedUsers = async () => {
    const usersToUnblock = users.filter((_, index) => selectedUsers[index]).map(user => user.id);
    if (usersToUnblock.length === 0) {
        console.log('No users selected for unblocking.');
        return;
    }

    try {
        await updateUserStatus({ userIds: usersToUnblock, action: 'unblock' });
        console.log('Users unblocked successfully.');
        refreshUserList();
    } catch (error) {
        console.error('Error unblocking users:', error);
    }
};

const handleDeleteSelectedUsers = async () => {
    const usersToDelete = users.filter((_, index) => selectedUsers[index]).map(user => user.id);
   
    if (usersToDelete.length === 0) {
        console.log('No users selected for deleting.');
        return;
    }

    const currentUserId = parseInt(localStorage.getItem('userId') || '0');

    try {
        await deleteUsers({ userIds: usersToDelete });
        console.log('Users deleted successfully.');

        // check if current user is in list of users to delete
        if (usersToDelete.includes(currentUserId)) {
            console.log('You have deleted yourself. Logging out...');
            handleLogout(); // logout if current user is deleted
        } else {
            refreshUserList(); // refresh user list if not deleting self
        }
        // reset checkboxes after deletion
        setSelectedUsers(Array(users.length).fill(false));
    } catch (error) {
        console.error('Error deleting users:', error);
    }
};

  return (
    <div className="container mb-3 mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
          <Toolbar 
              onBlock={handleBlockSelectedUsers} 
              onUnblock={handleUnblockSelectedUsers} 
              onDelete={handleDeleteSelectedUsers} 
          />
          <UserInfo name={userName} onLogout={handleLogout} />
      </div>
      <UserTable users={users} onRefresh={refreshUserList} onSelectedUsersChange={setSelectedUsers} />
    </div>
  );
};

export default UserManagementPage;
