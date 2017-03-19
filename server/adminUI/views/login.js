// 表单解析
var formParse = require('../../tools/formidableFormParse.js');

var User = require('../../models/user.js');

// md5加密
var md5 = require('../../tools/md5.js');

// token
var jwt = require('jwt-simple');

// 日期
var moment = require('moment');

// 登录
exports.loginIn = function(req,res){
		
	// 解析前台用户发送的表单数据
	formParse.formidableFormParse(req,function(err,result){

		// 用户名[前台输入]
		var username = result.username;

		// 密码[前台输入]
		var password = result.password;

		// 验证码[前台输入]
		var checkcode = result.checkcode;

		if(!req.session['login']){

			// session中login对象不存在
			res.json({code:7,message:'session中login对象不存在,非法登录'});

			return;

		}else{

			if(!req.session['login']['randomCode']){

				res.json({code:8,message:'后端验证码不存在,非法登录'});

				return;

			}

			// 验证码 [后端生成]
			var randomCode =  req.session['login']['randomCode'];

		}


		// 验证码是否填写用户名
		if(!username){

			res.json({code:1,message:'用户名不能为空'});

			return;

		}

		// 验证是否填写密码
		if(!password){

			res.json({code:5,message:'密码不能为空'})

			return;

		}

		// 验证是否填写 验证码
		if(!checkcode){

			res.json({code:6,message:'验证码不能为空'});

			return;

		}else{

			// 验证 验证码 是否填写正确
			if(checkcode != randomCode){

				res.json({code:2,message:'验证码输入错误'});

				return;

			}

		}

		// 查找用户名是否存在
		User.findOne({username:username,isAdmin:true},function(err,result){

			// 没有出错
			if(!err){

				// 用户名不存在
				if(!result){

					res.json({code:3,message:'用户名不存在'});

					return;

				}else{

					// 密码错误
					if(result.password != md5(md5(md5(password)))){

						res.json({code:4,message:'密码输入错误'});

						return;

					}else{

						var expires = moment().add(7,'days').valueOf();

						var Token = jwt.encode({
						  iss: result._id,
						  exp: expires
						},global.config.jwtsecret);

						res.json({
							code:0,
							message:'登录成功',
							Token:Token,
						  	expires:expires,
						  	user:result.toJSON()
						});

					}

				}

			}

		});

	});

}

// 根据Token检测登录状态是否有效
exports.validLoginStaus = function(req,res){

	res.send({code:0,message:'登录状态有效'});

}







