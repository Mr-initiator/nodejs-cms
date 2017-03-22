// 表单解析
var formParse = require('../../tools/formidableFormParse.js');

// 引用文章模型
var articleModel = require('../../models/article.js');

// 添加文章
exports.addArticle = function(req,res){

	// 解析前台用户发送的表单数据
	formParse.formidableFormParse(req,function(err,result){

		// 验证栏目名称是否填写
		if(!result.title){
			res.json({code:2,message:'请填写文章标题'});
			return;
		}


		// 添加文章
		articleModel.create(result,function(err,result){

			// 向前台发送 栏目添加是否成功的信息
			err ? res.json({code : 1,message:'文章添加失败'}) : res.json({code : 0,message : '文章添加成功'});

		})
		

	});

}

// 根据栏目ID获取文章列表
exports.getArticleListByID = function(req,res){

	var page = Number(req.query.page) || 1,
		limit = Number(req.query.limit) || 10,
		cid = req.query.cid;

	articleModel.paginate({columnID:cid}, {page: page, limit: limit, sort:{published:-1},}, function(err, result) {

		err ? res.json({code:1,message:'文章列表获取失败'}) : res.json({code:0,message:'文章列表获取成功',result:result});

	});

}

// 获取所有文章列表
exports.getArticleList = function(req,res){

	var page = Number(req.query.page) || 1,
		limit = Number(req.query.limit) || 10,
		language = req.query.language;

	articleModel.paginate({language:language}, {page: page, limit: limit, sort:{published:-1}}, function(err, result) {

		err ? res.json({code:1,message:'文章列表失败'}) : res.json({code:0,message:'文章列表获取成功',result:result});

	});

}

// 根据文章ID删除文章
exports.deleteByID = function(req,res){

	var id = req.query.id;

	if(!id){

		res.json({code:2,message:'文章ID不能为空'});

		return;
	}

	// 执行删除栏目操作
	articleModel.remove({_id:id},function(err){
			
		err ? res.json({code:2,message:'文章删除失败'}) : res.json({code:0,message:'文章删除成功'});
		
	});

}

// 根据文章ID获取指定文章信息
exports.getArticleByID = function(req,res){

	var id = req.query.id;

	if(!id){

		res.json({code:2,message:'文章ID不能为空'});

		return;
	}

	articleModel.find({_id:id},{},{},function(err,result){

		err ? res.json({code:2,message:'文章获取失败'}) : res.json({code:0,message:'文章获取成功',result:result[0]});

	});

}

// 根据文章ID修改指定文章信息
exports.modifyByID = function(req,res){

	var id = req.query.id;

	if(!id){

		res.json({code:2,message:'文章ID不能为空'});

		return;
	}

	formParse.formidableFormParse(req,function(err,result){

		// 验证文章名称是否填写
		if(!result.title){
			res.json({code:2,message:'请填写文章名称'});
			return;
		}

		// 修改栏目操作
		articleModel.update({_id:id},result,function(err,result){

			// 向前台发送 栏目添加是否成功的信息
			err ? res.json({code : 1,message:'修改文章失败'}) : res.json({code : 0,message : '修改文章成功'});

		});
		

	});

}

// 根据关键字搜索文章
exports.search = function(req,res){

	var page = Number(req.query.page) || 1,
		limit = Number(req.query.limit) || 10,
		key = req.query.key,
		language = req.query.language || 'ch';

	if(!key){

		res.json({code:2,message:'搜索关键字不能为空'});

		return;

	}

	var reg = new RegExp(key);

	articleModel.paginate({language:language,title:{$in:[reg]}},{page: page, limit: limit, sort:{published:-1}},function(err,result){

		err ? res.json({code:1,message:'搜索文章列表失败'}) : res.json({code:0,message:'搜索文章列表获取成功',result:result});


	});

}

// 获取文章总数
exports.getCount = function(req,res){

	var condition = req.query.condition;

	var language = req.query.language;

	if(condition){

		var reg = new RegExp(condition);

		condition = {title:{$in:[reg]},language:language};

	}else{

		condition = {language:language};

	}

	articleModel.count(condition,function(err,result){

		err ? res.json({code:1,message:'文章数量获取失败'}) : res.json({code:0,message:'文章数量获取成功',result:result});

	})

}

// 获取最新文档
exports.getLastedArticle = function(req,res){

	var limit = parseInt(req.query.limit) || 10,
		language = req.query.language;

	articleModel.find({language:language}).limit(limit).sort('-published').select('title published').exec(function(err,result){

		err ? res.json({code:1,message:'最新文档获取失败'}) : res.json({code:0,message:'最新文档获取成功',result:result});

	});

}