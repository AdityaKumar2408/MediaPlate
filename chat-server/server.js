// // server.js (Node.js)
// const express = require('express');
// const http = require('http');
// const { Server } = require('socket.io');
// const cors = require('cors');

// const app = express();
// app.use(cors());

// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "https://cosmic-otter-735437.netlify.app/", // React app's URL
//     methods: ["GET", "POST"]
//   }
// });
// app.get('/', (req, res) => {
//     res.send('Server is running perfectly!');
//   });
// io.on('connection', (socket) => {
//   console.log('New user connected');

//   // Join a specific group (room)
//   socket.on('joinGroup', ({ name, groupId }) => {
//     socket.join(groupId);
//     io.to(groupId).emit('message', `${name} has joined the group`);
//   });

//   // Handle sending messages
//   socket.on('sendMessage', ({ name, message, groupId }) => {
//     io.to(groupId).emit('message', `${name}: ${message}`);
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   });
// });

// server.listen(5000, () => {
//   console.log('Server is running on port 5000');
// });

require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.SOCKET_IO_ORIGIN, // Use the environment variable
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

// Use PORT from .env or fallback to 5000
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
