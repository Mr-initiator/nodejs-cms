export default angular.module('MessageService',[])
	.factory('MessageSer',['$http','CommonJs',($http,CommonJs)=>{
		
		let SERVER_PATH = CommonJs.SERVER_PATH;

		return {
			// 获取消息列表
			getMessage(params){

				return $http({
					method:'get',
					url:`${SERVER_PATH}message/getMessage`,
					params:params
				})

			},
			// 标记已读
			signRead(params){

				return $http({
					method:'get',
					url:`${SERVER_PATH}message/signRead`,
					params:params
				});

			},
			// 删除消息
			deleteMessage(params){

				return $http({
					method:'get',
					url:`${SERVER_PATH}message/deleteMessage`,
					params:params
				});

			},
			// 筛选消息
			filterMessage(params){
				return $http({
					method:'get',
					url:`${SERVER_PATH}message/filterMessage`,
					params : params
				})
			}
		}

	}])
	.name;