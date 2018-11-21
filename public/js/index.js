var socket = io();

function scrollToBottom () {
    var messages = $('#messages');
    var newMessage = messages.children('li:last-child');
    var clientheight = messages.prop('clientHeight');
    var scrollTop= messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientheight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight)
    }
}

socket.on('connect', () => {
    console.log('connected to server');
});

socket.on('disconnect', () => {
    console.log('disconnected from server');
});

socket.on('newMessage', message => {
   // console.log('New Message', message);
   // var li = $('<li></li>');
   // li.text(`${message.from}: ${message.text}`);
   // $('#messages').append(li);
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text
    });
    $('#messages').append(html);
    scrollToBottom();
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
