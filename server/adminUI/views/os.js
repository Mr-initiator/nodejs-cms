const os = require('os');

// 获取操作系统信息
exports.GetOsInfo = function(req,res){

	res.json({
		code:0,
		message:'获取操作系统信息成功',
		data:{
			platform : os.type(),
			freemem : os.freemem(),
			domain : global.domain || '空'
		}
	});

}