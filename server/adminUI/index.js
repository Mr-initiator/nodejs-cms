var common = require('./common.js');

var column = require('./views/column.js');

var article = require('./views/article.js');

var login = require('./views/login.js');

var user = require('./views/user.js');

var jwtauth = require('../tools/jwtauth.js');

var os = require('./views/os.js');

var settings = require('./views/settings.js');

var message = require('./views/message.js');

var language = require('./views/language.js');

exports.start = function(app){

	// 获取所有栏目
	app.get('/column/getAllColumn',[jwtauth],column.getAllColumn);

	// 根据ID获取指定栏目信息
	app.get('/column/getOneColumnById',[jwtauth],column.getOneColumnById)

	// 添加栏目
	app.post('/column/addColumn',[jwtauth],column.addColumn);

	// 删除栏目
	app.get('/column/deleteColumn',[jwtauth],column.deleteColumn);

	// 根据栏目ID修改栏目信息
	app.post('/column/modifyColumnById',[jwtauth],column.modifyColumnById);

	// 获取栏目总数
	app.get('/column/getCount',[jwtauth],column.getCount);

	// 根据栏目ID获取栏目模型
	app.get('/column/getModelByCID',[jwtauth],column.getModelByCID)
	
	// 图片上传
	app.post('/fileUpload',common.imageUpload);

	// 编辑器图片上传
	app.post('/editImageUpload',common.editImageUpload);

	// 添加文章
	app.post('/article/addArticle',[jwtauth],article.addArticle);

	// 根据栏目ID获取文章列表
	app.get('/article/getArticleListByID',[jwtauth],article.getArticleListByID);

	// 获取所有文章列表
	app.get('/article/getArticleList',[jwtauth],article.getArticleList);

	// 根据文章ID删除文章
	app.get('/article/deleteByID',[jwtauth],article.deleteByID);

	// 根据文章ID获取指定文章信息
	app.get('/article/getArticleByID',[jwtauth],article.getArticleByID);

	// 根据文章ID修改指定文章信息
	app.post('/article/modifyByID',[jwtauth],article.modifyByID);

	// 根据关键字搜索文章
	app.get('/article/search',[jwtauth],article.search);

	// 获取文章总数
	app.get('/article/getCount',[jwtauth],article.getCount);

	// 获取最新文档
	app.get('/article/getLastedArticle',[jwtauth],article.getLastedArticle);

	// 根据Token检测登录状态是否有效
	app.get('/login/validLoginStaus',[jwtauth],login.validLoginStaus);

	// 登录
	app.post('/login/loginIn',login.loginIn);

	// 图片验证码
	app.get('/checkcode.png',common.checkcode);

	// 获取用户列表
	app.get('/user/getUserList',[jwtauth],user.getUserList);

	// 添加用户
	app.post('/user/addUser',[jwtauth],user.addUser);

	// 根据ID删除用户
	app.get('/user/deleteUserByID',[jwtauth],user.deleteUserByID);

	// 获取会员总数
	app.get('/user/getCount',[jwtauth],user.getCount);

	// 获取操作系统信息
	app.get('/os/GetOsInfo',[jwtauth],os.GetOsInfo);

	// 提交网站配置信息
	app.post('/settings/setConfig',[jwtauth],settings.setConfig);

	// 获取网站配置信息
	app.get('/settings/getConfig',[jwtauth],settings.getConfig);
	
	// 提交留言
	app.post('/message/sendMessage',message.sendMessage);

	// 获取留言
	app.get('/message/getMessage',[jwtauth],message.getMessage);

	// 删除留言
	app.get('/message/deleteMessage',[jwtauth],message.deleteMessage);

	// 筛选留言
	app.get('/message/filterMessage',[jwtauth],message.filterMessage);

	// 标记已读
	app.get('/message/signRead',[jwtauth],message.signRead);

	// 添加语言
	app.post('/language/addLanguage',[jwtauth],language.addLanguage);

	// 获取语言列表
	app.get('/language/getLanguage',[jwtauth],language.getLanguage);

	// 选择语言
	app.get('/language/selectLang',[jwtauth],language.selectLang);

	// 获取当前选中的语言
	app.get('/language/getCurrentLang',[jwtauth],language.getCurrentLang);

	// 根据ID删除语言
	app.get('/language/deleteLangById',[jwtauth],language.deleteLangById);

}






















