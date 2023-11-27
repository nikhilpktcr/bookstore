import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Books from "./books.js";
import Stocks from "./stocks.js";
import Users from "./users.js";

const Purchases = sequelize.define('purchases', {
    // Define the columns of the 'purchases' table
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    book_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    stock_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    quantity: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    payment_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
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
    modelName: 'purchases'
  }
  );


  Purchases.belongsTo(Users, {
    foreignKey: 'user_id',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  });

  Purchases.belongsTo(Books, {
    foreignKey: 'book_id',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  });

  Purchases.belongsTo(Stocks, {
    foreignKey: 'stock_id',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  });
  
  export default Purchases;