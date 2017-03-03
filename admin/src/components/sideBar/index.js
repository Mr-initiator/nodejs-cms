import style from './index.less';
import template from './index.jade';

var sideBar = [
	()=>{
		return {
			restrict : 'E',
			template : template,
			replace : true
		}
	}
]

export default angular.module('sideBar',[])
	.directive('sideBar',sideBar)
	.name;



















































































































