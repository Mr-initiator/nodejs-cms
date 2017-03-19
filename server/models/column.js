var mongoose = require('mongoose');

var db = require("./db.js");

var columnSchema = new mongoose.Schema({
	parent        : {type:String,default:'none'},
	title         : {type:String,required:true},
	alias         : String,
	link 	      : String,
	language      : {type:String,required:true,default:'ch'},
	model         : String,
	columnIndex   : String,
	forceUrl      : String,
	weight        : {type:Number,default:1},
	route         : String,
	cover         : String,
	linksType     : String,
	switch        : Boolean,
	columnBrief   : String,
	columnContent : String
});


columnSchema.index({weight: 1}); 

var columnModel = db.model('Column',columnSchema);

module.exports = columnModel;
