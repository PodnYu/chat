
const { addUser, deleteUser, getUser, getUsers } = require('./users');

module.exports = function configureSockets(io) {
    io.on('connection', socket => {
        socket.on('join', (data) => {

            console.log(`User '${data.user}' joined the chat '${data.room}'!`);

            socket.emit('controlMessage', { user: 'control', text: `Welcome to the club, ${data.user}` });

            socket.broadcast.to(data.room).emit('controlMessage', { user: 'control', text: `${data.user} joined the chat!` });

            socket.join(data.room);

            socket.emit('users', { users: getUsers(data.room) });

            addUser(socket.id, data.user, data.room);

            socket.broadcast.to(data.room).emit('userJoined', { user: getUser(socket.id) });
        });

        socket.on('message', (message) => {
            socket.broadcast.to(message.room).emit('message', { user: message.user, text: message.text });
            console.log(message);
        });

        socket.on('goingToDisconnect', ({ user, room }) => {
            console.log(`User '${user}' left the chat '${room}'!`);
            socket.broadcast.to(room).emit('controlMessage', { user: 'control', text: `${user} left the chat` });
        });

        socket.on('disconnect', () => {
            let user = getUser(socket.id);
            let userName = 'undefined';

            //just in case something goes wrong
            if (user) {
                userName = user.userName
                socket.broadcast.to(user.room).emit('userLeft', { user: getUser(socket.id) });
            }

            console.log(`user ${userName} disconnected!`);
            deleteUser(socket.id);
        })
    });
}