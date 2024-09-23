const express = require("express");
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./db')

const app = express();

const port = process.env.PORT || 3001;

// Database connection
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
require('./routes')(app);

app.listen(port, () => {
    console.log("server running on port", port);
})