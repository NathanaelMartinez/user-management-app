import React from 'react';

interface UserInfoProps {
  name: string;
  onLogout: () => void;
}

const UserInfo: React.FC<UserInfoProps> = ({ name, onLogout }) => {
  return (
    <div className="user-info-box">
      <span>Welcome, {name}!</span> | <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default UserInfo;
