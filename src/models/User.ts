import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js'; // instance of Sequelize connected to DB

interface UserInstance extends Model {
  id: number;
  name: string;
  email: string;
  password: string;
  registrationTime: Date;
  lastLogin: Date;
  status: string; // active/blocked
}

const User = sequelize.define<UserInstance>('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false, // required
  },
  email: {
    type: DataTypes.STRING,
    unique: true, // no repeating emails
    allowNull: false, // required
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false, // required
  },
  registrationTime: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // Automatically sets the registration time
  },
  lastLogin: {
    type: DataTypes.DATE,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'active', // active when first created
  },
});

export default User;
