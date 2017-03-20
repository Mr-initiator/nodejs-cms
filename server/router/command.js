// 引用文章模型
var articleModel = require('../models/article.js');

// 获取首页推荐文章
module.exports = (config,callback)=>{

	var page = Number(config.page) || 1,
		limit = Number(config.limit) || 10,
		language = config.language;

	articleModel.paginate({language:language,recommend:'网站首页'},{page:page,limit:limit,sort:{published:-1},select:'title published author clickVolume columnID articleCover articleBrief columnName'},function(err,result){

			err ? callback(null) : callback(result);

		});

}