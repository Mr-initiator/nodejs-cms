exports.start = app=>{

	// 中间件
	var middleware = require('./middleware/middleware.js')(app);

	var index = require('./views/index.js')(app);

	var list = require('./views/list.js')(app);

	var article = require('./views/article.js')(app);

	// 配置
	app.all('*',middleware.GetSettings);

	// 导航
	app.get(['/','/list','/article'],middleware.GetNavigation);

	// 获取最新文章
	app.get(['/','/list','/article'],middleware.GetLastedArticle);

	// 首页 获取推荐文章
	app.get('/',index.command);

	// 列表页
	app.get('/list',list.GetList);

	// 详情页
	app.get('/article',article.GetArticleById);

	// 404
	app.use(middleware.error);

}