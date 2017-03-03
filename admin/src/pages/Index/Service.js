export default angular.module('IndexService',[])
	.factory('IndexSer',['$http','CommonJs',($http,CommonJs)=>{
		
		let SERVER_PATH = CommonJs.SERVER_PATH;

		return {

			// 获取操作系统信息
			GetOsInfo(Token){

				return $http({
					method : 'get',
					url : `${SERVER_PATH}os/GetOsInfo`,
					params : { Token }
				})

			},
			// 获取文章总数
			GetArticleCount(Token,language){

				return $http({
					method:'get',
					url:`${SERVER_PATH}article/getCount`,
					params : { Token,language }
				})

			},
			// 获取栏目总数
			GetColumnCount(Token,language){

				return $http({
					method:'get',
					url:`${SERVER_PATH}column/getCount`,
					params : { Token,language }
				})

			},
			// 获取会员总数
			GetUserCount(Token){

				return $http({
					method:'get',
					url:`${SERVER_PATH}user/getCount`,
					params : { Token }
				})

			},
			// 获取最新文档
			getLastedArticle(params){

				return $http({
					method:'get',
					url:`${SERVER_PATH}article/getLastedArticle`,
					params:params
				})

			},
			// 获取网站配置
			getInfo(Token,language){

				return $http({
					method:'get',
					url:`${SERVER_PATH}settings/getConfig`,
					params : { Token,language }
				})

			}

		}

	}])
	.name;