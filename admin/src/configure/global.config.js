export default angular.module('globalConfig',[])
	.factory('CommonJs',['$http','$rootScope','$state',function($http,$rootScope,$state){

		$rootScope.SERVER_PATH = 'http://localhost:3000/';
		$rootScope.LOCAL_PATH = 'http://localhost:8090/';
		$rootScope.$state = $state;

		return {

			// 服务器地址
			SERVER_PATH : 'http://localhost:3000/',
			LOCAL_PATH : 'http://localhost:8090/',

			// 将JSON对象序列化
			ConversionJson(ojson) {

				var temp = '',name,key;

				for(var attr in ojson) {

				    if(ojson.hasOwnProperty(attr)) name = attr;

				    key = ojson[attr];

				    temp += "&" + name + "=" + encodeURIComponent(key);
				};

				return temp.substring(1,temp.length);

			},
			// 设置localStorage
			setItem(key,data) {

			    return window.localStorage.setItem(key, window.JSON.stringify(data));

			},
			// 获取localStorage
			getItem(key) {

			    return window.JSON.parse(window.localStorage.getItem(key));

			},
			// 删除localStorage
			removeItem(key) {

			    return window.localStorage.removeItem(key);

			},
			//设置cookie
			setCookie(cname, cvalue, exdays) {

			    var d = new Date();

			    d.setTime(d.getTime() + (exdays*24*60*60*1000));

			    var expires = "expires="+d.toUTCString();

			    document.cookie = cname + "=" + cvalue + "; " + expires;

			},
			//获取cookie
			getCookie(cname) {
			    var name = cname + "=";
			    var ca = document.cookie.split(';');
			    for(var i=0; i<ca.length; i++) {
			        var c = ca[i];
			        while (c.charAt(0)==' ') c = c.substring(1);
			        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
			    }
			    return "";

			},
			//清除cookie  
			clearCookie(name) {

			    this.setCookie(name, "", -1);

			},
			// 判断是否支持 localStorage
			isLocalStorageSupported() {

			    var testKey = 'test',
			        storage = window.sessionStorage;
			    try {
			        storage.setItem(testKey, 'testValue');
			        storage.removeItem(testKey);
			        return true;
			    } catch (error) {
			        return false;
			    }

			},
			// 数组去重
			unique(arr) {

			    var n = {} , r = [];

			    for(var i = 0;i < arr.length;i++){
			        if (!n[arr[i]]){
			            n[arr[i]] = true;
			            r.push(arr[i]);
			        }
			    }

			    return r;
			    
			},
			// 查看值在数组中的下标
			arrIndexOf(arr,val){

			    for(var i=0;i<arr.length;i++){

			        if(arr[i] == val){
			            return i;
			        }

			    }

			    return -1;

			},
			// 获取当前选中的语言
			getCurrentLang(Token,callback){

				var This = this;

				$http({
					method:'get',
					url:`${$rootScope.SERVER_PATH}language/getCurrentLang`,
					params:{ Token }
				}).then(function(response){

					var response = response.data;

					// 检查令牌是否失效
					if(This.checkRequestCode(response.code)) return;

					if(!response.code){

						callback && callback(response.result);

					}else{

						swal('','当前选中语言获取失败');

					}
					
				});

			},
			// 检测登录状态是否有效
			validLoginStaus(Token){

				var result = null ;

				$.ajax({
					method:'get',
					url:`${$rootScope.SERVER_PATH}login/validLoginStaus`,
					async: false,
					data:{ Token },
					success:function(response){
						
						result = response;

					}
				});

				return result;

			},
			// 登录状态失效
			checkRequestCode(Code){

				if(Code == 10 || Code == 11 || Code == 12){

					localStorage.clear();

					$state.go('login');

					return true;

				}

				return false;

			}
			
		}

	}])
	.name;