const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', socket => {
  console.log('new user connected');

  // socket.emit('welcomingUserByAdmin');
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));

  // socket.broadcast.emit('notifyUsersOfNewUser');
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'A new user joined'));

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage: ', message);
    // IO will send to everyone
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server');
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
