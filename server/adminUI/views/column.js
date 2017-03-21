// 表单解析
var formParse = require('../../tools/formidableFormParse.js');

// 引用栏目模型
var columnModel = require('../../models/column.js');

// 添加栏目
exports.addColumn = function(req,res){

	// 解析前台用户发送的表单数据
	formParse.formidableFormParse(req,function(err,result){

		// 验证栏目名称是否填写
		if(!result.title){
			res.json({code:2,message:'请填写栏目名称'});
			return;
		}

		
		// 添加栏目
		columnModel.create(result,function(err,result){
			
			// 向前台发送 栏目添加是否成功的信息
			err ? res.json({code : 1,message:'栏目添加失败'}) : res.json({code : 0,message : '添加栏目成功'});

		})
		

	});

}

// 获取所有栏目
exports.getAllColumn = function(req,res){

	var currentLanguage = req.query.currentLanguage;

	if(!currentLanguage){

		res.json({
			code:2,
			message:'语言参数非法'
		});

		return;

	}

	columnModel.find({language:currentLanguage},{},{sort:{weight:1}},function(err,result){

		err ? res.json({code:1,message:'栏目信息获取失败'}) : res.json({code:0,message:'栏目信息获取成功',result:result});
		
	});

}

// 根据ID获取指定栏目信息
exports.getOneColumnById = function(req,res){

	// 获取要删除栏目的ID
	var id = req.query.id;

	// 如果栏目ID 没有传入
	if(!id){

		// 返回信息
		res.json({code:1,message:'请传入要获取栏目的ID'});

		// 阻止程序继续执行
		return;
	}

	// 根据传入的ID查询栏目信息
	columnModel.find({_id:id},{},{},function(err,result){

		// 返回信息
		err ? res.json({code:2,message:'指定栏目信息获取失败'}) : res.json({code:0,message:'指定栏目信息获取成功',result:result});

	});

}

// 删除栏目
exports.deleteColumn = function(req,res){

	// 获取要删除栏目的ID
	var id = req.query.id;

	// 如果栏目ID 没有传入
	if(!id){

		// 返回信息
		res.json({code:1,message:'请传入要删除栏目的ID'});

		// 阻止程序继续执行
		return;
	}
	
	// 执行删除栏目操作
	columnModel.remove({_id:id},function(err){
			
		err ? res.json({code:2,message:'栏目删除失败'}) : res.json({code:0,message:'栏目删除成功'});
		
	});
	
}

// 根据栏目ID修改栏目信息
exports.modifyColumnById = function(req,res){

	// 获取要删除栏目的ID
	var id = req.query.id;

	// 如果栏目ID 没有传入
	if(!id){

		// 返回信息
		res.json({code:1,message:'请传入要修改栏目的ID'});

		// 阻止程序继续执行
		return;
	}

	formParse.formidableFormParse(req,function(err,result){

		// 验证栏目名称是否填写
		if(!result.title){
			res.json({code:2,message:'请填写栏目名称'});
			return;
		}

		// 修改栏目操作
		columnModel.update({_id:id},result,function(err,result){

			// 向前台发送 栏目添加是否成功的信息
			err ? res.json({code : 1,message:'修改栏目失败'}) : res.json({code : 0,message : '修改栏目成功'});

		});
		

	});

}

// 获取栏目总数
exports.getCount = function(req,res){

	var language = req.query.language;
	
	columnModel.count({language:language},function(err,result){

		err ? res.json({code:1,message:'栏目数量获取失败'}) : res.json({code:0,message:'栏目数量获取成功',result:result});

	})

}

// 根据栏目ID获取栏目模型
exports.getModelByCID = function(req,res){

	var id = req.query.id;

	if(!id){

		res.json({code:1,message:'栏目ID不能为空'});

		return;
	}

	columnModel.findOne({_id:id}).select('model').exec(function(err,doc){
	
		err ? res.json({code:2,message:'栏目模型获取失败',result:null}) : res.json({code:0,message:'栏目模型获取成功',result:doc})

	})

}


