exports.start = function(app){

	// 首页
	app.get('/',function(req,res){
		res.render('index');
	});



































	// 404
	app.use(function(req,res){

		res.status(404);

		res.render('error');

	});

}