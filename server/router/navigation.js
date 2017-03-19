var columnModel = require('../models/column.js');

module.exports = (language,callback)=>{

	columnModel.find({language:language,switch:true},{title:1,link:1},{sort:{weight:1}},(err,result)=>{
		
		err ? callback(null) : callback(result);
		
	});

}
