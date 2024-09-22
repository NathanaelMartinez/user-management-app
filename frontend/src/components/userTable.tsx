import React, { ChangeEvent, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { User } from '../models/User';
  
interface UserTableProps {
    users: User[];
    onRefresh: () => void;
    onSelectedUsersChange: (selected: boolean[]) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onRefresh, onSelectedUsersChange }) => {
    const [selectedUsers, setSelectedUsers] = useState<boolean[]>([]);

    useEffect(() => {
        // initialize selected users state when users are updated
        setSelectedUsers(Array(users.length).fill(false));
    }, [users]);

    const handleUserSelect = (index: number) => {
        const updatedSelection = [...selectedUsers];
        updatedSelection[index] = !updatedSelection[index];
        setSelectedUsers(updatedSelection);
        onSelectedUsersChange(updatedSelection); // notify usermanagementpage
    };

    const handleSelectAll = (event: ChangeEvent<HTMLInputElement>): void => {
        const isChecked = event.target.checked;
        const newSelection = Array(users.length).fill(isChecked);
        setSelectedUsers(newSelection);
        onSelectedUsersChange(newSelection); // notify usermanagementpage
    };

    const formatDate = (dateString: string) => {
        if (!dateString) {
            return 'No info available';
        }
        const date = new Date(dateString);
        return format(date, 'HH:mm:ss MMM d, yyyy');
    };

    return (
        <div>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                id="select-all"
                                onChange={handleSelectAll}
                                checked={selectedUsers.length > 0 && selectedUsers.every(Boolean)} // ensure checked only if there are users
                            />
                        </th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Last Login</th>
                        <th>Registration Time</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.email}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={!!selectedUsers[index]}
                                    onChange={() => handleUserSelect(index)}
                                />
                            </td>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{formatDate(user.lastLogin)}</td>
                            <td>{formatDate(user.createdAt)}</td>
                            <td>{user.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
