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

	// 首页 获取焦点图
	app.get('/',index.Carousel);

	// 首页 获取文字广告
	app.get('/',index.GetTextAds);

	// 列表页
	app.get('/list',list.GetList);

	// 详情页 获取文章详情
	app.get('/article',article.GetArticleById);

	// 详情页 获取相关文章
	app.get('/article',article.GetSimlarArticle);

	// 详情页 提交评论
	app.post('/article/commit',article.commit);

	// 详情页 根据文章ID获取评论列表
	app.get('/article/comment',article.comment)

	// 404
	app.use(middleware.error);

}