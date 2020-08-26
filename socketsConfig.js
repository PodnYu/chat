
module.exports = function configureSockets(io) {
    io.on('connection', socket => {
        console.log('user entered the chat!');

        socket.on('join', (data) => {
            console.log(`User '${data.user}' joined the chat '${data.room}'!`);

            socket.emit('controlMessage', { user: 'control', text: `Welcome to the club, ${data.user}` });

            socket.broadcast.to(data.room).emit('controlMessage', { user: 'control', text: `${data.user} joined the chat!` });

            socket.join(data.room);

        });

        socket.on('message', (message) => {
            socket.broadcast.to(message.room).emit('message', { user: message.user, text: message.text });
            // io.to(message.room).emit('message', { user: message.user, text: message.text });
            console.log(message);
        });

        socket.on('goingToDisconnect', ({ user, room }) => {
            console.log(`User '${user}' left the chat '${room}'!`);
            socket.broadcast.to(room).emit('controlMessage', { user: 'control', text: `${user} left the chat` });
        });

        // socket.on('disconnect', () => {

        // })
    });
}