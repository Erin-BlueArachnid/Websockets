const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', socket => {
  console.log('new user connected');

  // socket.emit('welcomingUserByAdmin');
  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat app!',
    createdAt: new Date().getTime()
  });

  // socket.broadcast.emit('notifyUsersOfNewUser');
  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'A new user joined',
    createdAt: new Date().getTime()
  });

  socket.on('createMessage', message => {
    console.log('createMessage: ', message);
    // IO will send to everyone
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });

    // Broadcast will send the event to everybody except this socket.
    // So the new message event will get fired for everyone but myself.
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect', reason => {
    console.log(reason)
  });

});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
