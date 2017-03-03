import style from './index.less';
import template from './index.jade';

var header = [
	()=>{
		return {
			restrict : 'E',
			template : template,
			replace : true
		}
	}
]

export default angular.module('header',[])
	.directive('header',header)
	.name;



















































































































