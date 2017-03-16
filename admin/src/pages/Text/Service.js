export default angular.module('TextService',[])
	.factory('TextSer',['$http','CommonJs',($http,CommonJs)=>{
		
		let SERVER_PATH = CommonJs.SERVER_PATH;

		return {

			// 添加文章
			addArticle(formData,Token){

				// 发送请求
				return $http({
					method:'post',
					url : `${SERVER_PATH}article/addArticle`,
					data : formData,
					params : { Token }
				})

			},
			// 获取栏目信息
			getAllColumn(Token,currentLanguage){

				return $http({
					method:'get',
					url:`${SERVER_PATH}column/getAllColumn`,
					params:{ Token,currentLanguage }
				});

			},
			// 获取所有文章列表
			getArticleList(params){

				// 发送请求
				return $http({
					method:'get',
					url : `${SERVER_PATH}article/getArticleList`,
					params:params
				});

			},
			// 根据ID删除文章
			deleteByID(id,Token){

				// 发送请求
				return $http({
					method:'get',
					url : `${SERVER_PATH}article/deleteByID`,
					params:{ id,Token }
				});

			},
			// 根据ID获取指定文章信息
			getArticleByID(id,Token){

				// 发送请求
				return $http({
					method:'get',
					url : `${SERVER_PATH}article/getArticleByID`,
					params:{ id,Token }
				});

			},
			// 根据ID修改文章信息
			modifyByID(formData,id,Token){

				// 发送请求
				return $http({
					method:'post',
					url : `${SERVER_PATH}article/modifyByID`,
					data:formData,
					params : { id,Token }
				});

			},
			// 根据关键字搜索文章
			search(params){

				return $http({
					method:'get',
					url:`${SERVER_PATH}article/search`,
					params:params
				});

			},
			// 获取文章总数
			getCount(params){

				return $http({
					method:'get',
					url:`${SERVER_PATH}article/getCoun`,
					params:params
				});

			},
			// 根据栏目ID获取栏目模型
			getModelByCID(Token,id){

				return $http({
					method:'get',
					url:`${SERVER_PATH}column/getModelByCID`,
					params : { Token,id }
				});

			}

		}

	}])
	.name;