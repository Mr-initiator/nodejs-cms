export default angular.module('UserService',[])
	.factory('UserSer',['$http','CommonJs',($http,CommonJs)=>{
		
		let SERVER_PATH = CommonJs.SERVER_PATH;

		return {

			// 获取用户列表
			getUserList(params){

				return $http({
					method : 'get',
					url:`${SERVER_PATH}user/getUserList`,
					params : params
				});

			},
			// 添加用户
			addUser(formData,Token){

				return $http({
					method : 'post',
					url:`${SERVER_PATH}user/addUser`,
					data : formData,
					params:{ Token }
				});

			},
			// 根据ID删除用户
			deleteUserByID(id,Token){

				return $http({
					method:'get',
					url:`${SERVER_PATH}user/deleteUserByID`,
					params:{ Token,id }
				})

			}

		}

	}])
	.name;