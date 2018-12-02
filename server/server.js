const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users')

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

var users = new Users();

app.use(express.static(publicPath));

io.on('connection', socket => {
  console.log('new user connected');
  socket.on('join', function (params, callback) {
    console.log('name: ', !isRealString(params.name));
    console.log('room: ', !isRealString(params.room));
    if (!isRealString(params.name) || !isRealString(params.room)) {
      console.log('trigger callback')
      return callback('name and room name are required');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    // socket.emit('welcomingUserByAdmin');
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));

    // socket.broadcast.emit('notifyUsersOfNewUser');
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
    // socket.leave(params.room)
    callback();
  });

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage: ', message);
    var user = users.getUser(socket.id);
    if (user && isRealString(message.text)) {
        io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }
    // IO will send to everyone
    callback('This is from the server');
    // Broadcast will send the event to everybody except this socket.
    // So the new message event will get fired for everyone but myself.
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect', function (reason) {
    console.log(reason)
    var user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', user.name + ' has left the chat'));
    }
  });

  socket.on('updateUserList', function (users ) {
    console.log(users)
  });
});

server.listen(port, function () {
  console.log('Server is up on ' + port);
});
