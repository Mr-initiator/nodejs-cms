import template from './Template.jade';
import controller from './Controller.js';

export default function router($stateProvider){

	$stateProvider.state('login',{
		url : '/login',
		views : {
			'top' : {
				template : template,
				controller : controller
			}
		}
	});

}

router.$inject = ['$stateProvider'];



















