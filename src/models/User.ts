import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';

interface UserInstance extends Model {
  id: number;
  name: string;
  email: string;
  password: string;
  lastLogin?: Date; // optional: can be null
  status: 'active' | 'blocked'; // can only be one of two strings
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
  lastLogin: {
    type: DataTypes.DATE,
  },
  status: {
    type: DataTypes.ENUM('active', 'blocked'), // ENUM for status
    defaultValue: 'active', // active when first created
  },
}, {
  modelName: 'User',
  timestamps: true, // Set to false if you don't want createdAt and updatedAt
});

export default User;
