var articleModel = require('../../models/article.js');

module.exports = app=>{

	this.list = (req,res)=>{

		var language = app.locals.language,
			keywords = req.query.keywords,
			page = Number(req.query.page) || 1,
			limit = Number(req.query.limit) || 10,
			reg = new RegExp(keywords);

		console.log(keywords)

		articleModel.paginate({
			language : language,
			title : { $in:[reg] },
			recommend : {$in : ['普通文章']}
		},
		{
			page:page,
			limit:limit,
			sort:{
				published:-1
			},
			select:'title author published clickVolume articleCover articleBrief comments'
		},function(err,result){
			console.log(result)
			err ? res.render('error') : res.render('search',{list:result});

		});

	}
		return this;
}