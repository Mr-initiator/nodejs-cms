// 引用文章模型
var articleModel = require('../../models/article.js');

module.exports = app=>{

	// 根据文章ID获取文章详情
	this.GetArticleById = (req,res)=>{

		// 文章ID
		var id = req.query.id;

		articleModel.findOne({_id:id},function(err,doc){

			err ? res.render('error') : res.render('article',{article:doc});

		});

	}

	return this;

}