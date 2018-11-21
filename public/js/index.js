var socket = io();

socket.on('connect', () => {
    console.log('connected to server');

    socket.emit('createMessage', {
        from: 'Erin',
        text: 'alles lekker?'
    })
});

socket.on('disconnect', () => {
    console.log('disconnected from server');
});

socket.on('newMessage', message => {
   console.log('New Message', message);
});

