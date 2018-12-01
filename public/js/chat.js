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

socket.on('connect', function () {
    console.log('connected to server');
    var params = $.deparam(window.location.search);
    socket.emit('join', params, function (err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No error')
        }
    });
});

socket.on('disconnect', function () {
    console.log('disconnected from server');
});

socket.on('newMessage', function (message) {
   console.log('New Message', message);
   // var li = $('<li></li>');
   // li.text(`${message.from}: ${message.text}`);
   // $('#messages').append(li);
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        name: message.from
    });
    $('#messages').append(html);
    scrollToBottom();
});

socket.on('updateUserList', users => {
    console.log('Users list: ', users);
    var ul = $('<ul></ul>');
    users.forEach(function (user) {
       ul.append($('<li></li>').text(user));
    });
    $('#users').html(ul);
});

$('#message-form').on('submit', function (event) {
    event.preventDefault();
    socket.emit('createMessage', {
        text: $('input[name=message]').val()
    }, function () {
        $('input[name="message"]').val('');
    });
});

$('.toggle-view-users').on('click', function() {
   $('.card').toggleClass('is-flipped');
});

// socket.on('notifyUsersOfNewUser', () => {
//     console.log('A new †has joined!')
// });
//
// socket.on('welcomingUserByAdmin', () => {
//     console.log('Welcome user!')
// });
