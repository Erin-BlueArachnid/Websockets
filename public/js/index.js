var socket = io();

socket.on('connect', () => {
    console.log('connected to server');
});

socket.on('disconnect', () => {
    console.log('disconnected from server');
});

socket.on('newMessage', message => {
   console.log('New Message', message);
});

socket.emit('createMessage', {
    from: 'Frank',
    text: 'Hi! '
}, data => {
    console.log('Got it', data)
});

// socket.on('notifyUsersOfNewUser', () => {
//     console.log('A new user has joined!')
// });
//
// socket.on('welcomingUserByAdmin', () => {
//     console.log('Welcome user!')
// });
