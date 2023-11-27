import { Sequelize } from "sequelize"
import sequelize from '../config/database.js';
import Users from './users.js';
import Books from './books.js';
import Payments from './payments.js';
import Purchases from './purchases.js';
import Roles from './role.js';
import Stocks from './stocks.js';
const dbmodels = {
    Users,
    Books,
    Payments,
    Purchases,
    Roles,
    Stocks
}

Object.keys(dbmodels).forEach((model) => {
    if (dbmodels[model].associate) {
        dbmodels[model].associate(dbmodels);
    }
});

dbmodels.sequelize = sequelize;
dbmodels.Sequelize = Sequelize;

export default dbmodels;

