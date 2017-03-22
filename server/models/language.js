var mongoose = require('mongoose');

var db = require("./db.js");

var langSchema = new mongoose.Schema({
	lang_name  : {type:String,required:true,default:'中文'},
	lang_field : {type:String,required:true,default:'ch'},
	isChecked  : {type:Boolean,default:false}
});

var langModel = db.model('language',langSchema);

langModel.count({},(err,result)=>{

	if(!result){

		// 添加默认语言
		langModel.create({lang_name:'中文',lang_field:'cn',isChecked:true},err=>{

			err ? console.log('默认语言添加失败') : console.log('默认语言添加成功');

		});

	}

});

module.exports = langModel;
