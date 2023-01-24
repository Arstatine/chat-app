const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// db
require('./config/db');

// cors for front-end
app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// built-in middleware (express json)
app.use(express.json());

// cookie and body parser middleware
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use('/api/users', require('./routes/usersRoute'));
app.use('/api/messages', require('./routes/messagesRoutes'));

// port

const ACCESS_PORT = process.env.ACCESS_PORT || 5000;

// server running
httpServer.listen(ACCESS_PORT, () => {
  console.log(`server running on port ${ACCESS_PORT}`);
});
