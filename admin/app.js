import style from 'styles/skeleton.less';
import swalS from './node_modules/sweetalert/dist/sweetalert.css';
import jquery from 'expose-loader?jQuery!jquery';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngResource from 'angular-resource';
import angularFileUpload from 'angular-file-upload';
import imageScale from 'image-scale';
import swal from 'sweetalert';
import routerConfig from 'config/router.config.js';
import globalConfig from 'config/global.config.js';
import major from 'pages/Major'; 
import index from 'pages/Index';
import login from 'pages/Login';
import setting from 'pages/Setting';
import column from 'pages/column';

window.$ = jQuery;

angular.module('adminUI',[
	uiRouter,
	ngResource,
	'angularFileUpload',
	globalConfig,
	major,
	index,
	login,
	setting,
	column
])
.config(routerConfig);











