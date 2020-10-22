var express = require('express');
var app = express();
const path = require('path'); 
var http = require('http').createServer(app);
var io = require('socket.io')(http);
app.use(express.static(__dirname));

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/icarus', (req, res)=>{
    res.sendFile(__dirname + '/public/icarus.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('button click', (data) => {
        socket.broadcast.emit('button click', data);
        //console.log(text);
    })

    socket.on('alert click', (data) => {
        socket.broadcast.emit('alert click', data);
        //console.log(data.alertText);
    })

    socket.on('delete click', (data) => {
        socket.broadcast.emit('delete click', data);
        //console.log(text);
    })

    socket.on('change click', (data) => {
        socket.broadcast.emit('change click', data);
        //console.log(text);
    })

    socket.on('close', (data) => {
        socket.broadcast.emit('close', data);
        //console.log(text);
    })

    socket.on('Icarus add texts', (data) => {
        socket.broadcast.emit('Icarus add texts', data);
        //console.log(text);
    })
});

http.listen(3000, ()=>{
    console.log('listening on *:3000');
})