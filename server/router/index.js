// 导航
var navigation = require('./navigation.js');

// 列表
var list = require('./list.js');

exports.start = app=>{

	// 首页
	app.get('/',(req,res)=>{

		// 导航
		navigation('ch',navigation=>{

			// 网站公告
			list({'columnName':'网站公告',page:1,limit:5},notice=>{

				res.render('index',{
					navigation,
					notice : notice.docs
				})

			});
			

		});

	});

	// 404
	// app.use();

}