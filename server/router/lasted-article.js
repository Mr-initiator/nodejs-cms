// 引用文章模型
var articleModel = require('../models/article.js');

module.exports = (language,callback)=>{

	articleModel.find({language}).sort('-published').select('title published').exec(function(err,doc){

		err ? callback({}) : callback(doc);

	})

}