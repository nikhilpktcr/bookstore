import { Sequelize } from 'sequelize';
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';
import configData from './config.json' assert { type: 'json' }; // Adjust the path as necessary

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const env = process.env.NODE_ENV || 'development';
const config = configData[env];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  logging: config.logging,
  pool: {
    max: 10, // Maximum number of connections in the pool
    min: 0, // Minimum number of connections in the pool
    acquire: 30000, // Maximum time (in milliseconds) to acquire a connection before timing out
    idle: 10000, // Maximum time (in milliseconds) that a connection can remain idle before being released
  }
});

(async() =>{
    try {
        await sequelize.authenticate();
        console.log('Connect to database successfully.');
    } catch (error) {
        console.error('Unable to connect the database:', error);
    }
})()




export default sequelize;
