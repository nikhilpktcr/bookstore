import express from "express"
import cors from "cors"


const app = express();
const PORT = 5000 || process.env.PORT;

app.use(cors());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

app.listen(PORT,() => {
    console.log(`App running on port ${PORT}.`)
  });




