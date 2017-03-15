require('styles/skeleton.less');
require('./node_modules/fancybox/dist/css/jquery.fancybox.css');
require('./node_modules/sweetalert/dist/sweetalert.css');
require('./node_modules/wangeditor/dist/css/wangEditor.min.css');

import jquery from 'expose-loader?jQuery!jquery';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngResource from 'angular-resource';
import angularFileUpload from 'angular-file-upload';
import angularPaging from 'angular-paging'
import imageScale from 'image-scale';
import swal from 'sweetalert';
import wangeditor from 'wangeditor';
import fancybox from './node_modules/fancybox/dist/js/jquery.fancybox.pack.js';
import routerConfig from 'config/router.config.js';
import globalConfig from 'config/global.config.js';
import dirModule from 'config/directive.config.js';
import major from 'pages/Major'; 
import index from 'pages/Index';
import login from 'pages/Login';
import setting from 'pages/Setting';
import column from 'pages/Column';
import content from 'pages/Content';
import language from 'pages/Language';
import message from 'pages/Message';
import user from 'pages/User';
import text from 'pages/Text';


window.$ = jQuery;


angular.module('adminUI',[
	uiRouter,
	ngResource,
	'angularFileUpload',
	'bw.paging',
	globalConfig,
	dirModule,
	major,
	index,
	login,
	setting,
	column,
	content,
	language,
	message,
	user,
	text
])
.config(routerConfig)












