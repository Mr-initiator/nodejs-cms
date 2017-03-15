export default angular.module('ContentService',[])
	.factory('ContentSer',['$http','CommonJs',($http,CommonJs)=>{
		
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
			// 根据栏目ID获取文章列表
			getArticleListByID(params){
				// 发送请求
				return $http({
					method:'get',
					url : `${SERVER_PATH}article/getArticleListByID`,
					params:params
				});
			},
			// 根据ID删除文章
			deleteByID(id,Token){

				// 发送请求
				return $http({
					method :'get',
					url : `${SERVER_PATH}article/deleteByID`,
					params : { id,Token }
				});

			},
			// 根据ID获取指定文章信息
			getArticleByID(id,Token){

				// 发送请求
				return $http({
					method : 'get',
					url : `${SERVER_PATH}article/getArticleByID`,
					params : { id,Token }
				});

			},
			// 根据ID修改文章信息
			modifyByID(formData,id,Token){

				// 发送请求
				return $http({
					method : 'post',
					url : `${SERVER_PATH}article/modifyByID`,
					data : formData,
					params : { id,Token }
				});

			}

		}

	}])
	.name;