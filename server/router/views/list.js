// 引用文章模型
var articleModel = require('../../models/article.js');

module.exports = app=>{

	this.GetList = (req,res)=>{

		var page = Number(req.query.page) || 1,
			limit = Number(req.query.limit) || 10,
			columnName = req.query.name,
			language = app.locals.language;

		articleModel.paginate({
			language,
			columnName
		},
		{
			page,
			limit,
			sort:{
				published:-1
			},
			select:'title author published clickVolume articleCover articleBrief comments'
		},function(err,result){

			err ? res.render('error') : res.render('list',{columnName,list:result});

		});

	}

	return this;

}