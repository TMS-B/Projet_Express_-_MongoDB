require("dotenv").config();

const express = require("express");
const app = express();

const connectDB = require("./config/db");

const PORT = process.env.PORT;

const userRoutes = require("./routes/userRoutes");

const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/errorHandler');

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Serveur opérationnel`);
});
