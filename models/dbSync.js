import dbmodels from './index.js'
const { sequelize } = dbmodels;

console.log("sequelize", sequelize.sync);
// For Development

// For Development
const initialiseDb = async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log('Database synced successfully');
        process.exit();
    } catch (error) {
        console.error('Error syncing database:', error);
        process.exit(1); // Exit with a non-zero code indicating failure
    }
};
  
initialiseDb();