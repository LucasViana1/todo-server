const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const list = [];

io.on('connection', socket => {
  console.log(`New connection, id: ${socket.id}`);

  // pass current list to the new connections
  socket.emit('previous-list', list);

  socket.on('to-do-list', data => {
      console.log('Add task: ', data)
      list.push(data)
      io.emit('to-do-list', list)
  })

  socket.on('disconnect', () => {
      console.log(`Disconnect, id: ${socket.id}`)
  })
})

server.listen(3333);
