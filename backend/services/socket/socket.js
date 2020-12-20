module.exports = connectSocket
const roomService = require('./room-service')

let isFirstMsg = true
function connectSocket(io) {

    io.on('connection', function (socket) {
        socket.on('chat join', function (userName) {
            const helloMsg = { by: 'admin', txt: 'Hello,How can I help you today?' }
            const room = roomService.placeInRoom(userName)
            socket.join(room.id);
            socket.roomId = room.id;

            // if (room.members[0] !== 'admin' && room.members[1] !== 'admin') {
            // }
            if (userName !== 'admin') {
                io.to(socket.roomId).emit('chat newMsg', helloMsg);
            }

            socket.theUserName = userName;
        });
        socket.on('chat msg', function (txt) {
            // const deleyMsg = { by: 'admin', txt: 'I will be right with you in a couple of minutes' }
            var msgToSend = { by: socket.theUserName, txt };

            io.to(socket.roomId).emit('chat newMsg', msgToSend);

            // if (isFirstMsg) {
            //     setTimeout(() => io.brodcast.to(socket.roomId).emit('chat newMsg', deleyMsg), 2000)
            //     isFirstMsg = false;
            // }
        });
        // socket.broadcast.emit('chat newJoin', userName)
    });
}