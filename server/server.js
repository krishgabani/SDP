const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require("body-parser");
const dotenv = require('dotenv');

const {connectDB} = require('./config/db');


mongoose.set("strictQuery", false);
dotenv.config();

connectDB();

const app = express();

app.use(express.json());

//For-API Testing in PostMan:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//app.use(express.urlencoded());
app.use(cors());



app.use("/info",require('./routes/infoRoutes'));
app.use("/api/user",require('./routes/userRoutes'));
app.use("/api/admin",require("./routes/adminRoutes"));



app.listen(5000, () => {
  console.log("Server started at port 5000");
});
// "start": "concurrently \"cd ../frontend && npm start\" \"npm run server\"",
// "server": "nodemon server.js",