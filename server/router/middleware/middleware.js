var fs = require('fs');
var path = require('path');
// 语言模型
var languageModel = require('../../models/language.js');
// 栏目模型
var columnModel = require('../../models/column.js');
// 文章模型
var articleModel = require('../../models/article.js');

module.exports = app=>{

	// 获取网站配置
	this.GetSettings = (req,res,next)=>{
			
		var language = req.query.language || 'ch';

		languageModel.findOne({lang_field:language},function(err,result){

			if(err || (null == result)){

				res.render('error');

			}else{

				var setting = path.normalize(__dirname + '/../../settings_' + language + '.json');

				fs.readFile(setting,function(err,data){
					
					if(err){

						res.render('error');

					}else{

						app.locals.settings = JSON.parse(data.toString());

						app.locals.language = language;

						next();

					}

				});

			}

		})

	}

	// 获取网站导航
	this.GetNavigation = (req,res,next)=>{

		var language = app.locals.language;

		columnModel.find({language:language,switch:true},{title:1,link:1},{sort:{weight:1}},(err,result)=>{
			
			if(err){

				res.render('error');

			}else{

				app.locals.navigation = result;

				next();
			}
			
			
		});

	}

	// 获取最新文章
	this.GetLastedArticle = (req,res,next)=>{

		var language = app.locals.language;

		articleModel.find({language}).sort('-published').select('title published').limit(5).exec(function(err,result){

			if(err){

				res.render('error');

			}else{

				app.locals.lasted = result;

				next();

			}
			

		})

	}

	// 404
	this.error = (req,res)=>{
		res.render('error');
	}

	return this;

}