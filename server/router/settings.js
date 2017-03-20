var fs = require('fs');
var path = require('path');

module.exports = (language,callback) =>{

	var setting = path.normalize(__dirname + '/../settings_' + language + '.json');

	fs.readFile(setting,function(err,data){
		
		err ? callback({}) : callback(JSON.parse(data.toString()));

	});

}