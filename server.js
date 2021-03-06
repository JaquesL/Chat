const io = require('socket.io')(3000)

const users ={}

io.on('connection', socket => {
    socket.on('new-user', name => {
        user[socket.id] = name
        socket.broadcast.emit('user-connected', name)
    })
    socket.on('send-char-message', message => {
        socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', user[socket.id])
        delete user[socket.id]
    })
})