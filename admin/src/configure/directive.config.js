export default angular.module('dirModule',[])

	.directive('imageScale',[()=>{
		return (scope,element,attributes)=>{

			$(element).imageScale({
				scale:attributes.imageScale,
				rescaleOnResize:true,
				didScale:function(firstTime, options) {	
				    $(element).stop().animate({
				    	'opacity':1
				    },200);
				}
			})
		}

	}])
	.directive('fancybox',[()=>{

		return (scope,element,attributes)=>{

			$(element).fancybox({})

		}

	}])
	.name;