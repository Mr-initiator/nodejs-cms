import router from './Router.js';
import ColumnService from './Service.js';

export default angular.module('Column',[ColumnService])
	.config(router)
	.name;































































