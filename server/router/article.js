// 引用文章模型
var articleModel = require('../models/article.js');

// 根据文章ID获取文章详情
module.exports = (id,callback)=>{

	articleModel.findOne({_id:id},function(err,doc){

		err ? callback(null) : callback(doc);

	});

}