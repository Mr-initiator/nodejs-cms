import template from './Template.jade';
import controller from './Controller.js';

export default function router($stateProvider){
	
	$stateProvider.state('major',{
		url : '/major',
		abstract : true,
		views : {
			'top' : {
				template : template,
				controller : controller
			}
		}
	});

}

router.$inject = ['$stateProvider'];



















