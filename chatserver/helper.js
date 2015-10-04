var jsonfile = require('jsonfile')
var _ = require('underscore')
var fs = require('fs')
var file = 'userData.txt';
var map = {};
var jsonData = {};

function readFromJSONFile(){
	console.log('******* Read From Json File *******');
	jsonfile.readFile(file, function(err, obj) {
		jsonData = obj;
	  console.dir(jsonData)
	})
	console.log("*********");
	console.dir(jsonData);
	return jsonData;
}

function writetoJSONFile(file,map){
	console.log('******* Write To Json File *******');
	fs.writeFile(file, JSON.stringify(map), function(err) {
	    if(err) {
	        return console.log(err);
	    }
    	console.log("The file was saved!");
	});
}

module.exports = {
	getUserStatus:function(key){
		var userObj = readFromJSONFile()
		return userObj[key];
	},
	setUserStatus: function(key,value){

		map[key] = value;
		console.log(map);
		writetoJSONFile(file,map);
	},
	checkUserPresent: function(user){
		var userObj = readFromJSONFile();
		console.log(Object.keys(userObj));
		keys = Object.keys(userObj);
		if(typeof keys !== 'object' || keys != null){
			for(var key in keys){
				if(key == user){
					console.log("Username Exists")
					return true;
				}
			}
		}
		console.log("Username doesnt Exist");
		return false;
	},
	getUsersInChatRoom: function(){
		var userList = [];
		var userObj = readFromJSONFile();
		for(user in userObj){
			if(userObj[user] == "active"){
				userList.push(user);
			}else{
				// write logic
				continue; // ignore users if they are disconnected
			}
		}
		console.log("array"+userList+"??");
		if(_.isEmpty(userList)){
			return null;
		}else{
			return userList;
		}
	}
}