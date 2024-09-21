import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { User } from '../models/User';
import { deleteUsers, updateUserStatus } from '../services/api';
  
interface UserTableProps {
    users: User[];
    onRefresh: () => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onRefresh }) => {
    const [selectedUsers, setSelectedUsers] = useState<boolean[]>(Array(users.length).fill(false)); // track selected users, init to false
    const navigate = useNavigate();

    const handleUserSelect = (index: number) => {
        const updatedSelection = [...selectedUsers];
        updatedSelection[index] = !updatedSelection[index]; // toggle select state
        setSelectedUsers(updatedSelection);
    };
    
    function handleSelectAll(event: ChangeEvent<HTMLInputElement>): void {
        const isChecked = event.target.checked;
        setSelectedUsers(Array(users.length).fill(isChecked)); // set all to true or false
    }

    const formatDate = (dateString: string) => {
        if (!dateString) {
            return 'Never logged in';
        }

        const date = new Date(dateString);
        return format(date, 'HH:mm:ss MMM d, yyyy'); // Format the date
    };

    const handleBlockSelectedUsers = async () => {
        const usersToBlock = users.filter((_, index) => selectedUsers[index]).map(user => user.id); // collect selected userIds
        if (usersToBlock.length === 0) {
            console.log('No users selected for blocking.');
            return;
        }

        try {
            await updateUserStatus({ userIds: usersToBlock, action: 'block' }); // call the blockUsers function
            console.log('Users blocked successfully.');
            
            // check if current user is in blocked list
            const currentUserId = parseInt(localStorage.getItem('userId') || '0'); // make sure userId is number
            if (usersToBlock.includes(currentUserId)) {
                console.log('You have blocked yourself. Logging out...');
                localStorage.removeItem('token');
                localStorage.removeItem('userName');
                localStorage.removeItem('userId');
                navigate('/login'); // redirect to login
                return;
            } else {
                onRefresh(); // refresh user list if not blocking self
            }
        } catch (error) {
            console.error('Error blocking users:', error);
        }
    };

    const handleUnblockSelectedUsers = async () => {
        const usersToUnblock = users.filter((_, index) => selectedUsers[index]).map(user => user.id); // collect selected userIds
        if (usersToUnblock.length === 0) {
            console.log('No users selected for blocking.');
            return;
        }

        try {
            await updateUserStatus({ userIds: usersToUnblock, action: 'unblock' }); // call the blockUsers function
            console.log('Users unblocked successfully.');
            onRefresh();
        } catch (error) {
            console.error('Error unblocking users:', error);
        }
    };

    const handleDeleteSelectedUsers = async () => {
        const usersToDelete = users.filter((_, index) => selectedUsers[index]).map(user => user.id); // collect selected userIds
        if (usersToDelete.length === 0) {
            console.log('No users selected for deleting.');
            return;
        }

        try {
            await deleteUsers(usersToDelete); // call the delete function
            console.log('Users deleted successfully.');

            // check if current user is in delete list
            const currentUserId = parseInt(localStorage.getItem('userId') || '0'); // make sure userId is number
            if (usersToDelete.includes(currentUserId)) {
                console.log('You have blocked yourself. Logging out...');
                localStorage.removeItem('token');
                localStorage.removeItem('userName');
                localStorage.removeItem('userId');
                navigate('/login'); // redirect to login
            } else {
                onRefresh(); // refresh user list if not deleting self
            }
            setSelectedUsers(Array(users.length).fill(false)); // reset checkboxes
            onRefresh();
        } catch (error) {
            console.error('Error deleting users:', error);
        }
    };

    return (
        <div>
        <div className="toolbar">
            <button type="button" className="btn btn-secondary" onClick={handleBlockSelectedUsers}>Block</button>
            <button type="button" className="btn btn-secondary" onClick={handleUnblockSelectedUsers}>
            <i className="icon-unblock"></i> Unblock
            </button>
            <button type="button" className="btn btn-danger" onClick={handleDeleteSelectedUsers}>
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
                    <input 
                        type="checkbox"
                        checked={selectedUsers[index]} // Check individual checkbox
                        onChange={() => handleUserSelect(index)} // Toggle individual selection
                    />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{formatDate(user.lastLogin)}</td>
                <td>{user.status}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
};

export default UserTable;
