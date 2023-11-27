import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Books from './books.js';

const Stocks = sequelize.define('stocks', {
  // Define the columns of the 'stocks' table
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  book_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.BIGINT,
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
    modelName: 'stocks'
});

Stocks.belongsTo(Books, {
    foreignKey: 'book_id',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});

export default Stocks;