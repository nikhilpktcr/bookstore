import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Purchases from './purchases.js';

const Payments = sequelize.define('payments', {
  // Define the columns of the 'payments' table
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  purchase_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  payment_details: {
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
  modelName: 'payments'
}
);

Payments.belongsTo(Purchases, {
  foreignKey: 'purchase_id',
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE'
});

export default Payments;