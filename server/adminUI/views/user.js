// 表单解析
var formParse = require('../../tools/formidableFormParse.js');

// 引用用户模型
var userModel = require('../../models/user.js');

// md5加密
var md5 = require('../../tools/md5.js');

// 获取用户列表
exports.getUserList = function(req,res){

	var page = Number(req.query.page) || 1,
		limit = Number(req.query.limit) || 10;

	userModel.paginate({}, {page: page, limit: limit, sort:{isAdmin:-1}}, function(err, result) {

		err ? res.json({code:1,message:'用户列表失败'}) : res.json({code:0,message:'用户列表获取成功',result:result});

	});

}

// 添加用户
exports.addUser = function(req,res){

	formParse.formidableFormParse(req,function(err,result){

		// 验证用户名称是否填写
		if(!result.username){
			res.json({code:2,message:'用户名不能为空'});
			return;
		}

		if(!result.password){

			res.json({code:2,message:'密码不能为空'});

			return;

		}

		// 密码加密
		result.password = md5(md5(md5(String(result.password))));

		// 添加用户
		userModel.create(result,function(err,result){

			// 向前台发送 栏目添加是否成功的信息
			err ? res.json({code : 1,message:'用户添加失败'}) : res.json({code : 0,message : '添加用户成功'});

		})
		

	});

}

// 根据ID删除用户
exports.deleteUserByID = function(req,res){

	var id = req.query.id

	if(!id){

		res.json({code:1,message:'用户ID不能为空'});

		return;

	}

	userModel.remove({_id:id},function(err,result){

		err ? res.json({code:2,message:'用户删除失败'}) : res.json({code:0,message:'用户删除成功'});

	});

}

// 获取会员总数
exports.getCount = function(req,res){

	userModel.count({isAdmin:false},function(err,result){

		err ? res.json({code:1,message:'会员数量获取失败'}) : res.json({code:0,message:'会员数量获取成功',result:result});

	})

}