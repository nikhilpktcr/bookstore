import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Roles = sequelize.define('roles', {
  // Define the columns of the 'roles' table
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
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
    modelName: 'roles'
});

export default Roles;