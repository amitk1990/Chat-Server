
// Libraries
var helper = require('./helper.js');
var fs = require('fs');
var express = require('express'), app = express();
var http = require('http'),
	server = http.createServer(app), 
	io = require('socket.io').listen(server);

// SET UP READY
var port = 3000;
server.listen(port);
var path =require('path')

app.get('/',function(req,res){
	// res.send('It works!');
	console.log("aloha");
	var express = require('express');
	app.use(express.static(path.join(__dirname)));
	res.sendFile(path.join(__dirname, '../chatserver', 'index.html'));
})
console.log("Listening to port 3000");
// SET UP READY











// Actual Chat implementation
var data="hello";
var currentUser = "";


io.sockets.on('connection',function(socket){
	socket.emit('userLogin',data);


//User Connected
socket.on('newUser',function(User){
	console.log('new user joined '+User);
	currentUser = User;
	helper.setUserStatus(User,"online");
	console.log(User);
	activeUsers();
	socket.broadcast.emit('userConnected',User);
})

// list of active users emitted to everyone.
function activeUsers(){
	console.log("#############################");
	var userlist = helper.getUsersInChatRoom();
	console.log("List of Users"+userlist)
	socket.emit('currentUserinList',userlist);
}


// Chat message sent
socket.on('chatmessageSent',function(from,msg){
	console.log(from+" "+msg);
	activeUsers();
	io.emit('chatmessageSent',from,msg);
});

// disconnected message 
socket.on('disconnect', function () {
	console.log("Disconnected User");
	activeUsers();
	helper.setUserStatus(currentUser,"offline")
	io.emit('disconnected',currentUser);
});

})

// socket.on('checkUser',function(user,callback){
// 	console.log('Checking status of '+user);
// 	console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
// 	var status = helper.checkUserPresent(user);
// 	console.log(user+" status is "+status);
// 	socket.emit('verifiedUserstatus',status);
// })
// io.socket.on('disconnect',function(){
// 	console.log("disconnected");
// 	io.emit('userisdisconnected',person);
// })
