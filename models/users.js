import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Users = sequelize.define('users', {
  // Define the columns of the 'users' table
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue:'USER'
  },
  is_deleted:{
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue:DataTypes.NOW()
  },
  updated_at: {
    type:DataTypes.DATE,
    defaultValue:DataTypes.NOW()
  },
  created_by: {
    type: DataTypes.BIGINT
  },
  updated_by: {
    type:DataTypes.BIGINT
  },
},
{
    sequelize,
    timestamps: false,
    modelName: 'users'
});

export default Users;