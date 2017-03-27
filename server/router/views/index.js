// 引用文章模型
var articleModel = require('../../models/article.js');

module.exports = app=>{

	// 获取推荐到首页的文章
	this.command = (req,res,next)=>{

		var page = Number(req.query.page) || 1,
			limit = Number(req.query.limit) || 10,
			language = app.locals.language; 

		articleModel.paginate({
			language:language,
			recommend:'推荐文章'
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

			app.locals.command = result;

			next();

		});

	}

	// 根据栏目名称获取焦点图(首页焦点图)
	this.Carousel = (req,res,next)=>{

		var language = app.locals.language; 
		articleModel.find({
			language:language,
			columnName:'首页焦点图',
			recommend:'焦点图'
		})
		.select('articleCover forceUrl title')
		.exec(function(err,result){

			app.locals.Carousel = result;

			next();

		})

	}

	// 根据栏目名称获取文字广告(文字广告)
	this.GetTextAds = (req,res)=>{

		var language = app.locals.language;

		articleModel.findOne({
			language:language,
			columnName:'文字广告',
			recommend:'文字广告'
		})
		.select('title forceUrl articleBrief columnName')
		.exec(function(err,result){

			if(null == result){

				app.locals.textAds = {};

			}else{

				app.locals.textAds = result;

			}


			err ? res.render('error') : res.render('index');

		})

	}


	return this;
}