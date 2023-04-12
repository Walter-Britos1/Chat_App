const { Socket } = require('dgram');
const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(server);

io.on('connection', (socket) => {
  // socket.on('chat', (mensaje) => {
  //   console.log(`El mensaje es: ${mensaje}`);
  // });

  socket.on('chat', (mensaje) => {
    io.emit('chat', mensaje)
  });
});

app.get('/', (req, res) =>{
  res.sendFile(`${__dirname}/cliente/index.html`)
});

const PUERTO = process.env.PUERTO || 3000
server.listen(PUERTO, () => console.log(`El servidor esta escuchando en el puerto ${PUERTO}...`));
