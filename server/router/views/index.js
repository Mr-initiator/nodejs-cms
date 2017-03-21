// 引用文章模型
var articleModel = require('../../models/article.js');

module.exports = app=>{

	this.command = (req,res)=>{

		var page = Number(req.query.page) || 1,
			limit = Number(req.query.limit) || 10,
			language = app.locals.language;

		articleModel.paginate({
			language:language,
			recommend:'网站首页'
		},
		{
			page:page,
			limit:limit,
			sort:{
				published:-1
			},
			select:'title published author clickVolume columnID articleCover articleBrief columnName'
		},
		function(err,result){

			err ? res.render('error') : res.render('index',{ command : result });

		});

	}

	return this;
}