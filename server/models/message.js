var mongoose = require('mongoose');

var mongoosePaginate = require('mongoose-paginate');

var db = require("./db.js");

var messageSchema = new mongoose.Schema({
	title        : {type:String,required:true},
	content         : {type:String,required:true},
	contact         : String,
	time         : {type:Date,default:Date.now()},
	unread : {type:Boolean,default:true},
	language : {type:String,required:true,default:'ch'}
});

messageSchema.index({time: 1}); 

messageSchema.plugin(mongoosePaginate);

var messageModel = db.model('Message',messageSchema);

module.exports = messageModel;
