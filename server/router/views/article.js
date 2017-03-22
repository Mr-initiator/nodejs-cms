// 引用文章模型
var articleModel = require('../../models/article.js');
var formParse = require('../../tools/formidableFormParse.js');

module.exports = app=>{

	// 根据文章ID获取文章详情
	this.GetArticleById = (req,res,next)=>{
		
		// 文章ID
		var id = req.query.id;

		articleModel.findOne({_id:id},function(err,result){

			app.locals.article = result;

			// 如果文章不存在
			if(null == result){

				res.render('error');

				return;
			}

			// 增加阅读量
			if(result.clickVolume == '' || Object.is(Number(result.clickVolume),NaN)){

				result.clickVolume = 1;

			}else{

				result.clickVolume = ++result.clickVolume;

			}

			// 存储到数据库
			result.save();

			next();

		});

	}

	// 获取相关文章
	this.GetSimlarArticle = (req,res)=>{

		var language = app.locals.language;

		var columnName = app.locals.article.columnName;

		articleModel.find({
			language,
			columnName
		})
		.select('title')
		.limit(5)
		.exec(function(err,result){

			app.locals.simlar = result;

			err ? res.render('error') : res.render('article');

		});

	}

	// 提交评论
	this.commit = (req,res)=>{

		formParse.formidableFormParse(req,function(err,result){

			var id = result.id,
				applyContent = result.applyContent,
				nickName = result.nickName,
				email = result.email;
				parentID = result.parentID;

			if(!id){

				res.json({code:1,message:'评论文章ID为空'});

				return;
			}

			// 文章ID
			articleModel.findOne({_id:id}).select('comments').exec(function(err,result){

				if(err){

					res.json({code:2,message:'评论失败'});

					return;

				}

				// 如果文章不存在
				if(null == result){

					res.render('error');

					return;
				}

				// 添加
				result.comments.push({
					applyContent,nickName,email,parentID
				});

				// 保存
				result.save(function(err){

					if(err){

						res.json({code:3,message:'保存数据失败'});

						return;
					}

					res.json({code:0,message:'评论成功'});

				});

			});

		});

	}

	// 根据文章ID获取评论列表
	this.comment = (req,res)=>{

		var id = req.query.id;

		console.log(id)

		if(!id){

			res.json({code:1,message:'文章ID不能为空'});

			return;	

		}

		articleModel.findOne({_id:id}).select('comments').exec(function(err,result){

			if(err || (null == result)){

				res.json({code:2,message:'评论列表获取失败'});

				return;

			}

			res.json({code:0,message:'评论列表获取成功',result:result.comments});


		});

	}

	return this;

}