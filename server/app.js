var express = require('express');
var session = require("express-session");
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var jwt = require('jwt-simple');
var adminUI = require('./adminUI');
var router = require('./router');
var config = require('./config.js');

// 实例化express 获取app
var app = express();

// 将日期格式化方法挂载到全局
app.locals.moment = require('moment');

// 设置全局配置变量
global.config = {};

// 从配置文件中取值 赋值给全局配置变量
Object.assign(global.config,config);

// 设置模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// 加载解析cookie的中间件
app.use(cookieParser(global.config.jwtsecret));

// 设置session
app.use(session({
    secret: global.config.jwtsecret,
    resave: true,
    saveUninitialized: true
}));

// 跨域设置
app.all('*',function(req,res,next) {  
    res.header('Access-Control-Allow-Origin','http://localhost:8090');  
    res.header('Access-Control-Allow-Headers','Origin,X-Requested-With, Content-Type, Accept');  
    res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS'); 
    res.header('Access-Control-Allow-Credentials',true);
    next();  
});

// 加载日志中间件
app.use(logger('dev'));

// 设置public文件夹为存放静态文件的目录
app.use(express.static(path.join(__dirname, 'public')));

// 上传文件目录
app.use('/uploads',express.static('./uploads'));

// adminUI API
adminUI.start(app);

// FrontUI router
router.start(app);


module.exports = app;
