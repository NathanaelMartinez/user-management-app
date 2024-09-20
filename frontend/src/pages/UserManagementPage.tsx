import React from 'react';

interface User {
  name: string;
  email: string;
  lastLogin: string;
  status: string;
}

interface UserManagementPageProps {
  users: User[];
}

const UserManagementPage: React.FC<UserManagementPageProps> = ({ users }) => {
  return (
    <div>
      <div className="toolbar">
        <button type="button" className="btn btn-danger">Block</button>
        <button type="button" className="btn btn-secondary">
          <i className="icon-unblock"></i> Unblock
        </button>
        <button type="button" className="btn btn-danger">
          <i className="icon-delete"></i> Delete
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" id="select-all" />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Last Login</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.email}>
              <td>
                <input type="checkbox" className="user-checkbox" />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.lastLogin}</td>
              <td>{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagementPage;
