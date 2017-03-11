export default angular.module('ColumnService',[])
	.factory('ColumnSer',['$http','$rootScope','CommonJs',($http,$rootScope,CommonJs)=>{
		
		let SERVER_PATH = CommonJs.SERVER_PATH;

		return {

			// 添加栏目
			addColumn(formData,Token){

				// 发送请求
				return $http({
					method:'post',
					url : `${SERVER_PATH}column/addColumn`,
					data : formData,
					params:{ Token }
				})

			},
			// 获取所有栏目
			getAllColumn(Token,currentLanguage){

				return $http({
					method:'get',
					url:`${SERVER_PATH}column/getAllColumn`,
					params:{Token,currentLanguage}
				});

			},
			// 根据ID获取指定栏目信息
			getOneColumnById(id,Token){

				return $http({
					method:'get',
					url:`${SERVER_PATH}column/getOneColumnById`,
					params:{ id,Token }
				})

			},
			// 删除栏目
			deleteColumn(id,Token){

				return $http({
					method:'get',
					url:`${SERVER_PATH}column/deleteColumn`,
					params:{ id,Token }
				})

			},
			// 根据ID修改指定栏目信息
			modifyColumnById(id,formData,Token){

				// 发送请求
				return $http({
					method:'post',
					url : `${SERVER_PATH}column/modifyColumnById`,
					data : formData,
					params : {id,Token}
				})

			}

		}

	}])
	.name;