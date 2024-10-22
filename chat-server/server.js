// server.js (Node.js)
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001", // React app's URL
    methods: ["GET", "POST"]
  }
});
app.get('/', (req, res) => {
    res.send('Server is running perfectly!');
  });
io.on('connection', (socket) => {
  console.log('New user connected');

  // Join a specific group (room)
  socket.on('joinGroup', ({ name, groupId }) => {
    socket.join(groupId);
    io.to(groupId).emit('message', `${name} has joined the group`);
  });

  // Handle sending messages
  socket.on('sendMessage', ({ name, message, groupId }) => {
    io.to(groupId).emit('message', `${name}: ${message}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(5000, () => {
  console.log('Server is running on port 5000');
});
