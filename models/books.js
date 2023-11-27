import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Books = sequelize.define('books', {
  // Define the columns of the 'books' table
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  cover: {
    type: DataTypes.STRING,
    allowNull: true,
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
    modelName: 'books'
}
);

export default Books;