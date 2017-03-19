// 表单解析
var formParse = require('../../tools/formidableFormParse.js');

// 文件模块
var fs = require('fs');

// 路径模块
var path = require('path');

// 设置网站配置
exports.setConfig = function(req,res){

	// 解析前台用户发送的表单数据
	formParse.formidableFormParse(req,function(err,result){

		// 判断提交数据是否出错
		if(err){

			// 出错
			res.json({
				code:2,
				message:'提交数据出错'
			})

		}else{

			// 没错
			var language = result.language;

			if(!language){

				res.json({
					code:3,
					message:'语言参数非法'
				});

			}else{

				// 网站配置文件路径
				var settingsPath = path.normalize(__dirname + '/../../settings_'+ language +'.json');

				// 将配置信息写入配置文件
				fs.writeFile(settingsPath,JSON.stringify(result),(err)=>{

					err ? res.json({code:1,message:'配置写入失败'}) : res.json({code:0,message:'配置写入成功'})

				});

			}

			

		}



	});

}

// 获取网站配置
exports.getConfig = function(req,res){

	var language = req.query.language;

	// 网站配置文件路径
	var settingsPath = path.normalize(__dirname + '/../../settings_'+ language +'.json');

	fs.readFile(settingsPath,(err,data)=>{

		if(err){

			res.json({
				code:1,
				message:'配置文件读取出错'
			});

			return;
		}

		res.json({
			code:0,
			message:'配置文件读取成功',
			result:JSON.parse(data.toString())
		});


	});

}