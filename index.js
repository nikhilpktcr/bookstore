import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';
import cors from "cors"
import dbModels from "./models/index.js" 
import routes from "./routes/index.js"
import authenticateUser from "./middleware/auth.js"
dotenv.config();


const { sequelize } = dbModels;
const PORT = 5000 || process.env.PORT;
// Create Express app
const app = express();


// Load environment variables from .env file
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//application middleware
app.use(authenticateUser); 


// Import and use routes
app.use('/api', routes);

//database sync and connection
(async () => {
  try {
    await sequelize.sync({ alter : true }); // Sync Sequelize models with the database
    console.log('Database synced successfully');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
  }
})();