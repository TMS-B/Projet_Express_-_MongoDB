// Express
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());


// DB
const connectDB = require('./db/db');

// Routes
const userRoutes = require('./routes/userRoute');

// Dotenv
const dotenv = require('dotenv');
dotenv.config();

// Middlewares
app.use(express.json());
app.use('/api/users', userRoutes)

app.get('/', (res) => {
    res.send('Hello Mohammed');
});

app.listen(3000, () => {
    connectDB();
    console.log(`Serveur démarré sur le port: http://localhost:3000`)
})