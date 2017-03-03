var mongoose = require('mongoose');

var mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;

var db = require("./db.js");

var md5 = require('../tools/md5.js');

var userSchema = new Schema({
	username        : {type:String,required:true},
	password        : {type:String,required:true},
	realname        : String,
	email           : String,
	photo           : String,
	isAdmin			: Boolean
	
});

userSchema.plugin(mongoosePaginate);

var userModel = db.model('User',userSchema);

// 查看是否有默认管理员 用于第一次登录 登录后请先设置新的管理账号 并删除此段代码和创建的默认管理员
userModel.count({},function(err,result){

	if(!result){

		userModel.create({username:'admin',password:md5(md5(md5('admin'))),'realname':'admin',photo:'',isAdmin:true},(err)=>{

			err ? console.log('默认管理员账户创建失败') : console.log('默认管理员账户创建成功');

		})

	}

});

module.exports = userModel;
