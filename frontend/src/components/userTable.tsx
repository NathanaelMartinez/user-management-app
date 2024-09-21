import React, { ChangeEvent, useState } from 'react';
import { User } from '../models/User';
  
interface UserTableProps {
    users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
    const [selectedUsers, setSelectedUsers] = useState<boolean[]>(Array(users.length).fill(false)); // track selected users, init to false
    
    const handleUserSelect = (index: number) => {
        const updatedSelection = [...selectedUsers];
        updatedSelection[index] = !updatedSelection[index]; // toggle select state
        setSelectedUsers(updatedSelection);
    };
    
    function handleSelectAll(event: ChangeEvent<HTMLInputElement>): void {
        const isChecked = event.target.checked;
        setSelectedUsers(Array(users.length).fill(isChecked)); // Set all to true or false
    }

    return (
        <div>
        <div className="toolbar">
            <button type="button" className="btn btn-secondary">Block</button>
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
                    <input 
                        type="checkbox" 
                        id="select-all" 
                        onChange={handleSelectAll} 
                        checked={selectedUsers.every(Boolean)}
                    />
                    Select All
                </th>
                <th>Name</th>
                <th>Email</th>
                <th>Last Login</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user, index) => (
                <tr key={user.email}>
                <td>
                    <input type="checkbox"
                        checked={selectedUsers[index]} // Check individual checkbox
                        onChange={() => handleUserSelect(index)} // Toggle individual selection
                    />
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

export default UserTable;
