export default function Controller($scope,$state,IndexSer,CommonJs){

	// 获取登录Token
	const Token = window.localStorage.getItem('Token');

	if(!Token){

		$state.go('login');

		return;

	}

	// 获取操作系统信息
	GetOsInfo();

	// 获取用户数量
	GetUserCount();

	// 获取栏目数量
	GetCurrentLanguage(GetColumnCount);

	// 获取文章数量
	GetCurrentLanguage(GetArticleCount);

	// 获取最新文档
	GetCurrentLanguage(GetLastedArticle);

	// 获取网站配置
	GetCurrentLanguage(GetInfo)
	
	// 获取操作系统信息
	function GetOsInfo(){

		IndexSer.GetOsInfo(Token).then(response=>{

			var response = response.data;

			// 检查令牌是否失效
			if(CommonJs.checkRequestCode(response.code)) return;

			if(!response.code){

				$scope.OsInfo = response.data;

			}
			
		});

	}

	// 获取用户数量
	function GetUserCount(){

		IndexSer.GetUserCount(Token).then(response=>{

			var response = response.data;

			// 检查令牌是否失效
			if(CommonJs.checkRequestCode(response.code)) return;

			if(response.code) return;

			$scope.UserCount = response.result;

		});

	}

	// 获取当前使用语言
	function GetCurrentLanguage(callback){

		CommonJs.getCurrentLang(Token,callback);

	}

	// 获取栏目数量
	function GetColumnCount(language){

		IndexSer.GetColumnCount(Token,language.lang_field).then(response=>{

			var response = response.data;

			// 检查令牌是否失效
			if(CommonJs.checkRequestCode(response.code)) return;

			if(response.code) return;
			
			$scope.columnCount = response.result;



		});

	}

	// 获取文章数量
	function GetArticleCount(language){

		IndexSer.GetArticleCount(Token,language.lang_field).then(response=>{

			var response = response.data;

			if(response.code) return;

			// 检查令牌是否失效
			if(CommonJs.checkRequestCode(response.code)) return;
			
			$scope.articleCount = response.result;

		});

	}

	// 获取最新文档
	function GetLastedArticle(language){

		IndexSer.getLastedArticle({Token,language:language.lang_field,limit:10}).then(response=>{

			var response = response.data;

			// 检查令牌是否失效
			if(CommonJs.checkRequestCode(response.code)) return;

			if(response.code) return;

			$scope.lastedArticle = response.result;

		});

	}

	// 获取网站配置
	function GetInfo(language){

		IndexSer.getInfo(Token,language.lang_field).then(response=>{

			var response = response.data;

			// 检查令牌是否失效
			if(CommonJs.checkRequestCode(response.code)) return;

			if(!response.code){

				$scope.webConfig = response.result;

			}else{

				swal('配置获取失败','暂无配置','error');

			}
			
		});

	}


}

Controller.$inject = ['$scope','$state','IndexSer','CommonJs'];