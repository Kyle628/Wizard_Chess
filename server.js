var express = require('express');
var socket = require ('socket.io');

var app = express();
var server = app.listen(3000);

app.use(express.static('public'));

console.log('server is running');

var io = socket(server);
io.sockets.on('connection', newConnection);

function newConnection(socket) {
	console.log('new connection: ' + socket.id);

	socket.on('move', moveMsg);

	function moveMsg(piece) {
		socket.broadcast.emit('move', piece);
		//console.log(piece);
	}
}