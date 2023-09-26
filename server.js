const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  maxHttpBufferSize: 1e9
});

app.use(express.static('public'))

app.get('/', (_, res) => {
  res.sendFile(__dirname + '/demo_1.html');
});

app.get('/demo_2', (_, res) => {
  res.sendFile(__dirname + '/demo_2.html');
});

app.get('/demo_3', (_, res) => {
  res.sendFile(__dirname + '/demo_3.html');
});

io.on('connection', (socket) => {
  socket.on("mouse position", (msg) => {
    io.emit('mouse position', msg);
  });

  socket.on("image preview", (msg) => {
    io.emit('image preview', msg);
  })

  socket.on("svg draw", (msg) => {
    io.emit('svg draw', msg);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});