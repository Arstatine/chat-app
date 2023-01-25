const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Server } = require('socket.io');
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

// socket
const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  },
});

// server running
httpServer.listen(ACCESS_PORT, () => {
  console.log(`server running on port ${ACCESS_PORT}`);
});

var users = [];

io.on('connection', (socket) => {
  socket.on('add-user', (id) => {
    if (!users.length) {
      users.push({ id, socketId: socket.id });
    }

    for (let i = 0; i < users.length; i++) {
      if (users[i].id == id) {
        return (users[i].socketId = socket.id);
      }
    }
    users.push({ id, socketId: socket.id });
  });

  socket.on('send-message', (data, id) => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id == id) {
        io.to(users[i].socketId).emit('receive-message', data);
      }
    }
  });

  socket.on('typing', (id) => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id == id) {
        io.to(users[i].socketId).emit('receive-typing');
      }
    }
  });

  socket.on('typing-off', (id) => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id == id) {
        io.to(users[i].socketId).emit('receive-typing-off');
      }
    }
  });

  socket.on('disconnect', () => {
    users = users.filter((user) => {
      return user.socketId != socket.id;
    });
  });
});
