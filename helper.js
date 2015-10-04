var jsonfile = require('jsonfile')
var fs = require('fs')
var file = 'userData.txt';
var map = {};
var array=[1,2,3];


function readFromJSONFile(){
	var keys = [];
	console.log('******* Read From Json File *******');
	var contents = fs.readFileSync(file);
	var jsonData = JSON.parse(contents);
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
	}
}