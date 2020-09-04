
const { addUser, deleteUser, getUser, getUsers } = require('./users');

/*

    There are some problems with sockets configuration:
        1) The data isn't encrypted for now (I know that SSL should do the trick,
        but I would like to add another inner layer of encryption)
        2) For now WS (web sockets) don't have authentication mechanism.
        I know it's not hard to do it with token-based strategy, 
        but in this project I decided to use cookie-based instead,
        so I don't have an idea how to do it in an appropriate way.
        Since there is no authentication with WS, everyone, who has ip:port can connect to the server via WS,
        because the server doesn't know who to connect/disconnect or how much connections are allowed.
        The worst thing in this is that the server is opened for DOS attacks.

*/

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
                socket.broadcast.to(user.room).emit('controlMessage', { user: 'control', text: `${user.userName} left the chat` });
            }

            console.log(`user ${userName} disconnected!`);
            deleteUser(socket.id);
        })
    });
}