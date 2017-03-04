import template from './Template.jade';
import controller from './Controller.js';

export default function router($stateProvider){

	$stateProvider.state('major.column',{
		url : '/column',
		views : {
			'multiple' : {
				template : template,
				controller : controller
			}
		}
	});

}

router.$inject = ['$stateProvider'];



















