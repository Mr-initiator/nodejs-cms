// 语言模型
var langModel = require('../../models/language.js');

// 栏目模型
var columnModel = require('../../models/column.js');

// 文章模型
var articleModel = require('../../models/article.js');

// 留言模型
var messageModel = require('../../models/message.js');

var formParse = require('../../tools/formidableFormParse.js');

var path = require('path');

var fs = require('fs');

// 添加语言
exports.addLanguage = function(req,res){

	formParse.formidableFormParse(req,function(err,result){

		if(!result.lang_name){
			res.json({code:1,message:'请填写语言显示名称'});
			return;
		}

		if(!result.lang_field){
			res.json({code:2,message:'请填写语言字段名称'});
			return;
		}

		langModel.findOne({lang_name:result.lang_name},(err,doc)=>{

			if(!err && !doc){

				langModel.findOne({lang_field:result.lang_field},(err,doc)=>{

					if(!err && !doc){

						langModel.create({ lang_name : result.lang_name,lang_field : result.lang_field},err=>{

									err ? res.json({code:3,message:'语言添加失败'}) : res.json({code:0,message:'语言添加成功'});

								});

					}else{

						res.json({code:4,message:'语言字段名称已存在'});

					}

				})

			}else{

				res.json({code:3,message:'语言显示名称已存在'});

			}

		});

	});

}

// 获取语言列表
exports.getLanguage = function(req,res){

	langModel.find({},(err,result)=>{

		err ? res.json({code:1,message:'语言列表获取失败'}) : res.json({code:0,message:'语言列表获取成功',result:result});

	});

}

// 选择语言
exports.selectLang = function(req,res){

	var lang_field = req.query.lang_field;

	langModel.find({},(err,result)=>{

		if(!err){

			var length = result.length;

			(function iterator(i){

				if(i == length){

					res.json({code:0,message:'设置成功'});

					return;

				}

				if(result[i].lang_field == lang_field){

					result[i].isChecked = true;

				}else{

					result[i].isChecked = false;

				}

				result[i].save(err=>{

					if(!err){

						iterator(i+1);

					}else{

						res.json({code:1,message:'设置失败'});

						return;

					}

				})

			})(0);

		}else{

			res.json({code:1,message:'查找失败'});

		}

	});

}

// 获取当前选中的语言
exports.getCurrentLang = function(req,res){

	langModel.findOne({isChecked:true},(err,result)=>{

		if(!err){

			if(result){

				res.json({code:0,message:'当前选中语言获取成功',result:result});

			}else{

				res.json({code:2,message:'该语言没有被找到'});

			}

		}else{

			res.json({code:1,message:'当前选中语言获取失败'})

		}


	});

}

// 根据ID删除语言
exports.deleteLangById = function(req,res){

	// 语言ID
	var id = req.query.id;

	// 语言字段
	var lang_field = req.query.lang_field;

	if(!id){

		res.json({code:1,message:'要删除语言的ID不存在,非法操作'});

		return;
	}

	langModel.remove({_id:id},err=>{

		if(!err){

			columnModel.remove({language:lang_field},err=>{

				if(!err){

					articleModel.remove({language:lang_field},err=>{

						if(!err){

							messageModel.remove({language:lang_field},err=>{

								if(!err){

									// 网站配置文件路径
									var settingsPath = path.normalize(__dirname + '/../../settings_'+ lang_field +'.json');

									fs.unlink(settingsPath,err=>{

										res.json({code:0,message:'语言删除成功'});

									});


								}else{

									res.json({code:5,message:'和该语言相关的留言删除失败'})

								}

							});

						}else{

							res.json({code:4,message:'和该语言相关的文章删除失败'})

						}

					});

				}else{

					res.json({code:3,message:'和该语言相关的栏目删除失败'});

				}

			});

		}else{

			res.json({code:2,message:'删除语言失败'});

		}

	});

}








