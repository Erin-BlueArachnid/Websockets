var socket = io();

socket.on('connect', () => {
    console.log('connected to server');
});

socket.on('disconnect', () => {
    console.log('disconnected from server');
});

socket.on('newMessage', message => {
   console.log('New Message', message);
   var li = $('<li></li>');
   li.text(`${message.from}: ${message.text}`);
   $('#messages').append(li);
});

$('#message-form').on('submit', e => {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'user',
        text: $('input[name=message]').val()
    }, () => {

    });
});

// socket.on('notifyUsersOfNewUser', () => {
//     console.log('A new user has joined!')
// });
//
// socket.on('welcomingUserByAdmin', () => {
//     console.log('Welcome user!')
// });
