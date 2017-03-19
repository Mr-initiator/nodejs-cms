var formParse = require('../../tools/formidableFormParse.js');

var messageModel = require('../../models/message.js');

// 添加留言
exports.sendMessage = function(req,res){

	formParse.formidableFormParse(req,function(err,result){

		if(!result.title.trim()){

			res.json({
				code:1,
				message:'主题不能为空'
			});

			return;

		}

		if(!result.content.trim()){

			res.json({
				code:1,
				message:'内容不能为空'
			});

			return;

		}

		messageModel.create(result,err=>{

			err ? res.json({code:3,message:'留言失败'}) : res.json({code:0,message:'留言成功'});

		});

	});

}

// 获取留言
exports.getMessage = function(req,res){

	var page = Number(req.query.page) || 1,
		limit = Number(req.query.limit) || 10,
		language = req.query.language;

	messageModel.paginate({language:language},{page: page, limit: limit, sort:{time:-1},}, function(err, result) {

		err ? res.json({code:1,message:'留言列表获取失败'}) : res.json({code:0,message:'留言列表获取成功',result:result});

	});

}

// 删除留言
exports.deleteMessage = function(req,res){

	var id = req.query.id;

	if(!id){

		res.json({
			code:'1',
			message:'要删除的留言ID不存在,非法操作'
		});

	}

	messageModel.remove({_id:id},err=>{

		err ? res.json({code:1,message:'删除失败'}) : res.json({
			code:0,message:'删除成功'});

	});

}

// 标记已读
exports.signRead = function(req,res){

	var id = req.query.id;

	if(!id){

		res.json({
			code:1,
			message:'标记已读ID为空,非法操作'
		});

		return;
	}

	messageModel.findOne({_id:id},(err,result)=>{

		if(err){

			res.json({
				code:2,
				message:'查找失败'
			});

			return;

		}

		if(!result.unread){

			res.json({
				code:2,
				message:'已经是已读状态'
			});

			return;

		}

		result.unread = false;

		result.save(function(err){

			err ? res.json({code:3,message:'标记已读失败'}) : res.json({code:0,message:'标记成功'});

		});


	});

}

// 筛选消息
exports.filterMessage = function(req,res){

	var condition = Number(req.query.condition),
		page = Number(req.query.page) || 1,
		limit = Number(req.query.limit) || 10,
		language = req.query.language;

	switch(condition){
		case 1 :
			condition = {language:language};
			break;
		case 2 :
			condition = {unread:false,language:language};
			break;
		case 3 :
			condition = {unread:true,language:language};
	}

	messageModel.paginate(condition,{page: page, limit: limit, sort:{time:-1},}, function(err, result) {

		err ? res.json({code:1,message:'留言列表获取失败'}) : res.json({code:0,message:'留言列表获取成功',result:result});

	});

}



