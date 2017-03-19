// 引用文章模型
var articleModel = require('../models/article.js');

// 根据栏目名称获取文章列表
module.exports = function(config,callback){

	var page = Number(config.page) || 1,
		limit = Number(config.limit) || 10,
		columnName = config.columnName;
	
	articleModel.paginate({columnName:columnName},{page:page,limit:limit,sort:{published:-1}},function(err,result){

		err ? callback(null) : callback(result);

	});

}