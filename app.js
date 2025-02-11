const express = require('express');
const app = express;

const connectDB = require('./config/db');

require('dotenv').config();
const PORT = process.env.PORT;

const userRoutes = require("./routes/userRoutes");

connectDB();

app.use(express.json());
app.use("/api/users", userRoutes);

app.listen(PORT,() => {
    console.log(`Serveur opérationnel`);  
});