var socket = io.connect('http://localhost:3000');
var loginUser; 	// contains the name of client user
var statusUser = false;
$(document).ready(function(){
	overlayDisplay(true);
	$('.userForm').on('submit',function(e){
		e.preventDefault();
		loginUser = $('.usernamedetails').val();
		overlayDisplay(false);
		console.log(socket);
		socket.emit('newUser',loginUser);
		return false;
	});

	// send message and exchange
	$('#form').on('submit',function(e){
		e.preventDefault();
		sendMessageListener();
		return false;
	});
});

/*
 * overlayDisplay show and hide
*/
function overlayDisplay(value){
	console.log(value);
	(value == true) ? $('.overlayContainer').show() : $('.overlayContainer').hide();
}

/*
* Check if user is a valid user
*/

// function userCheck(UserName){
// 	var flag;
// 	loginUser = $.trim(loginUser);
// 	if(loginUser.length > 0){
// 		socket.emit('checkUser',loginUser);
// 		socket.on('verifiedUserstatus',function(value){
// 			console.log(value);
// 			if(value == true){
// 				flag=1;	// user name exists
// 			}else{
// 				flag=0;	// user name doesnt exists
// 			}
// 		});
// 	}else{
// 		// NO INPUT ENTERED
// 		return false;
// 	}
// 	// USER VALIDATION STATUS FLAG
// 	if(flag == 0){
// 		return false;
// 	}else{
// 		return true;
// 	}
// }

/*
* Send message to the chat room server
*/
function sendMessageListener(){
		var fromMessage = $('#user').val();
		var message = $('#messageBox').val();
		if($.trim(message) != ""){
			socket.emit('chatmessageSent',fromMessage,message);
		}
		$('#messageBox').val('').focus();
}



/*
* check if the user is client user 
* user is client user welcome the user
* user is another user notify all users in the chat room
*/
socket.on('userConnected',function(name){
	console.log(name);
	if(loginUser != name){
		$('#messages').append('<li><b>'+name+" joined the chat room </b></li>");
		$('#onlineUser').append('<li class="online"><div class="statusSym onlineSymbol"></div><div class="userNameBox"><span>'+name+'</span></div></li>');
	}else{
		$('#messages').append('<li><b>'+name+" welcome to the chat room </b></li>");
	}
});	


socket.on('chatmessageSent',function(from,msg){
	var name = $('#user').val();		
	var me = $('#user').val();
	var color = (from == me) ? 'green' : 'red';
	$('#messages').append('<li><b style="color:' + color + '">'+ from + '</b>:' + msg + '</li>');
});

socket.on('userisdisconnected',function(userName){
	$('#messages').append('<li><b style="color:red'+userName+" has left the chat room </b></li>");
	$('.statusSym').removeClass('onlineSymbol').addClass('offlineSymbol');
});


/*
* Current list of active users in my chat room
*/
socket.on('currentUserinList',function(usersInfo){
	console.log(usersInfo);
	var me = $('#user').val();
	if(usersInfo == null){
		return;
	}
	for(var i = 0 ; i<usersInfo.length;i++){
		if(loginUser !== usersInfo[i]){
		$('#onlineUser').append('<li class="online"><div class="statusSym onlineSymbol"></div><div class="userNameBox"><span>'+usersInfo[i]+'</span></div></li>');
		}
	}
});

// function notifyTyping() {
//   var user = $('#user').val();
//   socket.emit('notifyUser', user);
// }

// socket.on('notifyUser',function(user){
// 	console.log("hi");
// 	var me = $('#user').val();
// 	if(me != user){
// 		$('#notifyUser').text(user+'is typing');
// 	}
// 	setTimeout(function(){
// 		$('#notifyUser').text('');
// 	},10000);
// })




