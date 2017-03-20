var mongoose = require('mongoose');

var mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;

var db = require("./db.js");

var articleSchema = new Schema({
	title           : {type:String,required:true},
	recommend       : Array,
	isActive        : Boolean,
	clickVolume     : String,
	columnName		: String,
	author 			: String,
	forceUrl        : String,
	articleCover    : String,
	published       : {type:Date,default:Date.now},
	articleBrief    : String,
	articleContent  : String,
	pagetitle       : String,
	pagekeywords    : String,
	pagedescription : String,
	columnID        : Schema.Types.ObjectId,
	language      : {type:String,required:true,default:'ch'},
});


articleSchema.index({published: 1}); 

articleSchema.plugin(mongoosePaginate);

var articleModel = db.model('Article',articleSchema);

module.exports = articleModel;
