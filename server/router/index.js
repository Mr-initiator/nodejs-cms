// 导航
var navigation = require('./navigation.js');

// 根据栏目名称获取文章列表
var list = require('./list.js');

// 获取推荐文章
var command = require('./command.js');

// 获取文章详情
var article = require('./article.js');

// 网站配置
var settings = require('./settings.js');

// 获取最新文章
var lastedArticle = require('./lasted-article.js');

exports.start = app=>{

	// 配置
	app.get(['/','/list','/article'],(req,res,next)=>{

		var language = req.query.language || 'ch';

		settings(language,settings=>{

			app.locals.settings = settings;

			next();

		});

	});

	// 导航
	app.get(['/','/list','/article'],(req,res,next)=>{

		var language = req.query.language || 'ch';

		navigation(language,navigation=>{

			app.locals.navigation = navigation;

			next();

		});

	});

	// 获取最新文章
	app.get(['/','/list','/article'],(req,res,next)=>{

		var language = req.query.language || 'ch';

		lastedArticle(language,lasted=>{

			app.locals.lasted = lasted;

			next();

		});

	});

	// 首页
	app.get('/',(req,res)=>{

		var page = req.query.page;
		var language = req.query.language || 'ch';

		// 获取推荐的文章
		command({page,language},function(command){

			res.render('index',{
				command
			});

		});

	});


	// 列表页
	app.get('/list',(req,res)=>{

		// 页码
		var page = req.query.page;

		// 栏目名称
		var name = req.query.name;

		// 列表文章
		list({'columnName':name},function(list){

			res.render('list',{
				columnName : name,
				list : list
			})
		})
		
	});


	app.get('/article',(req,res)=>{

		// 文章ID
		var id = req.query.id;

		// 文章详情
		article(id,function(article){

			if(article){

				res.render('article',{
					article
				});

			}else{

				res.render('error');

			}
			
		})
		
	});

	// 404
	app.use(function(req,res){
		res.render('error')
	});

}