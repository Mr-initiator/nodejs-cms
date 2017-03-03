import style from 'styles/skeleton.less';
import swalS from './node_modules/sweetalert/dist/sweetalert.css';
import jquery from 'expose-loader?$!jquery';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngResource from 'angular-resource';
import routerConfig from 'config/router.config.js';
import globalConfig from 'config/global.config.js';
import major from 'pages/Major'; 
import index from 'pages/Index';
import login from 'pages/Login';
import swal from 'sweetalert';




angular.module('adminUI',[uiRouter,ngResource,globalConfig,major,index,login])
	.config(routerConfig);











