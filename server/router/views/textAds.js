var articleModel = require('../../models/article.js');

module.exports = app=>{

	this.list = (req,res)=>{

		var language = app.locals.language,
			columnName = req.query.name,
			page = Number(req.query.page) || 1,
			limit = Number(req.query.limit) || 10;

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
			select:'title forceUrl articleBrief'
		},function(err,list){
			console.log(list)
			err ? res.render('error') : res.render('textAds',{list});

		})

	}

	return this;

}