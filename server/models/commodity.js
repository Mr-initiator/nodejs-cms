var mongoose = require('mongoose');

var mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;

var db = require("./db.js");

var commoditySchema = new Schema({
	name           : {type:String,required:true},
	alias   	   : String,
	isActive        : Boolean,
	published       : {type:Date,default:Date.now},
	recommend       : Array,
	thumbnail 		: String,
	content 		: String,
	market  		: Number,
	Promotion		: Number,
	originLink		: String,
	brand 			: String,
	classify		: String,
	pagetitle       : String,
	pagekeywords    : String,
	pagedescription : String,
	columnID        : Schema.Types.ObjectId,
	language      : {type:String,required:true,default:'ch'},
});


commoditySchema.index({published: 1}); 

commoditySchema.plugin(mongoosePaginate);

var commodityModel = db.model('Article',commoditySchema);

module.exports = commodityModel;
