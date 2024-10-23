// require('dotenv').config(); 
// const express = require('express');
// const http = require('http');
// const { Server } = require('socket.io');
// const cors = require('cors');

// const app = express();
// app.use(cors());

// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "https://bespoke-bubblegum-37956b.netlify.app", // Netlify URL
//     methods: ["GET", "POST"]
//   }
// });

// app.get('/', (req, res) => {
//   res.send('Server is running perfectly!');
// });

// io.on('connection', (socket) => {
//   console.log('New user connected');

//   socket.on('joinGroup', ({ name, groupId }) => {
//     socket.join(groupId);
//     io.to(groupId).emit('message', `${name} has joined the group`);
//   });

//   socket.on('sendMessage', ({ name, message, groupId }) => {
//     io.to(groupId).emit('message', `${name}: ${message}`);
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   });
// });
// const PORT = process.env.PORT || 5000;

// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


require('dotenv').config(); 
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    // origin: ["https://bespoke-bubblegum-37956b.netlify.app", "http://localhost:3001"], // Netlify URL
    // origin: ["http://localhost:3001","http://localhost:3000","https://capable-syrniki-760b81.netlify.app/"], // Netlify URL
    // origin: "http://localhost:3001", // Netlify URL
    origin: "https://frolicking-licorice-ddb114.netlify.app/", // Netlify URL
    methods: ["GET", "POST"],
    credentials:true
  }
});

app.get('/', (req, res) => {
  res.send('Server is running perfectly!');
});

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('joinGroup', ({ name, groupId }) => {
    socket.join(groupId);
    io.to(groupId).emit('message', `${name} has joined the group`);
  });

  socket.on('sendMessage', ({ name, message, groupId }) => {
    // io.to(groupId).emit('message', `${name}: ${message}`);
    io.to(groupId).emit('message', { name, message, from: socket.id });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
