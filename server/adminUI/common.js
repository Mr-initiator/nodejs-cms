// 表单解析
var formParse = require('../tools/formidableFormParse.js');

// 图片验证码模块
var captchapng = require('captchapng');

// 引用path模块
var path = require('path');

// 获取路径分隔符
var sep =  path.sep;

// 上传图片路径处理
var reg = sep == '\\' ? /\\management/ : /\/management/;

// 向外暴露对象

// 图片上传 
exports.imageUpload = imageUpload;

// 编辑器图片上传
exports.editImageUpload = editImageUpload;

// 图片验证码
exports.checkcode = checkcode;


// 图片上传
function imageUpload(req,res){


	formParse.formidableFormParse(req,function(err,doc){

		if(err){

			res.json({'ecode':1,message:'图片上传失败'});

		}else{

			for(var attr in doc){

				doc[attr].path = doc[attr].path.replace(reg,'');

			}

			res.json(doc);

		}
		 

	});

}

function editImageUpload(req,res){

	formParse.formidableFormParse(req,function(err,doc){

		for(var attr in doc){

			doc[attr].path = doc[attr].path.replace(reg,'');

			var imagePath = doc[attr].path;

		}

		err ? res.json({"code": 1,"msg": "图片上传失败"}) : res.json({"code": 0,"msg": "图片上传成功","data": {"src": imagePath}});

	});

}

// 图片验证码
function checkcode(req,res){

	// 随机数
	var randomCode = parseInt(Math.random()*9000+1000);

	// 实例化验证码对象
	var p = new captchapng(110,38,randomCode); // 宽度 高度 验证码

	// 背景色
	p.color(0, 0, 0, 0);

	// 画笔颜色
	p.color(80, 80, 80, 255);


	// 如果session中没有login对象
	if(undefined == req.session['login']){

		// 定义session中login属性为对象
		req.session['login'] = {};

	}

	// 将随机验证码存储到session对象中
	req.session['login']['randomCode'] = randomCode;

	var img = p.getBase64();

    var imgbase64 = new Buffer(img,'base64');

    res.send(imgbase64);

}
