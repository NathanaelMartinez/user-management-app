import React from 'react';
import UserTable from '../components/userTable';
import UserInfo from '../components/userInfo';

const UserManagementPage: React.FC = ( ) => {

  // TODO: remove dummy data after testing 
  const users = [
    { name: 'John Doe', email: 'john@example.com', lastLogin: '2023-09-15', status: 'Active' },
    { name: 'Jane Smith', email: 'jane@example.com', lastLogin: '2023-09-10', status: 'Blocked' },
    { name: 'Bob Johnson', email: 'bob@example.com', lastLogin: '2023-09-12', status: 'Active' },
  ];

  const handleLogout = () => {
    console.log("Logging out...");
    // TODO: implement logout logic
  };

  return (
    <div>
      <UserInfo name={users[0].name} onLogout={handleLogout} />

      <UserTable users={users} /> {/* Use UserTable here */}
    </div>
  );
};

export default UserManagementPage;
