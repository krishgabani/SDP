const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const {sendtodb} = require('./Controllers/sendDataroute')
const {connectDB} = require('./config/db');
const {sendjournal} = require('./Controllers/sendJournal.js')


mongoose.set("strictQuery", false);
dotenv.config();

connectDB();

const app = express();
app.use(express.json());
//app.use(express.urlencoded());
app.use(cors());


app.post("/senddata", sendtodb);
app.post("/sendjournal",sendjournal);
app.use("/api/user",require('./routes/userRoutes'));



app.listen(5000, () => {
  console.log("Server started at port 5000");
});
// "start": "concurrently \"cd ../frontend && npm start\" \"npm run server\"",
// "server": "nodemon server.js",