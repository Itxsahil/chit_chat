const  express = require('express')
const path = require('path')
const app = express();
const PORT = process.env.port || 3030

const server = app.listen(PORT, () => {
    console.log("app is running on port : " + PORT);
})

const io = require('socket.io')(server);


app.use(express.static(path.join('public')));

let socketConnected = new Set();

io.on('connection',onConnected)


function onConnected(socket) {
    // console.log('New client connected', socket.id);
    socketConnected.add(socket);

    io.emit('clints-total', socketConnected.size)


    socket.on('disconnect', ()=> {
        // console.log('Client disconnected', socket.id);
        socketConnected.delete(socket);
        io.emit('clints-total', socketConnected.size)
    })

    socket.on('message', (data)=> {
        // console.log('Message received:', data);
        socket.broadcast.emit('chat-message', data)
    })

    socket.on('feedback', (data)=> {
        socket.broadcast.emit('feedback', data)
    })
}

