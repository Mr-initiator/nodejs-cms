define(function(require,exports,module){

	var userAgent = navigator.userAgent.toLowerCase();
	var rSafari = /.*version\/([\w.]+).*(safari).*/;
	var match = rSafari.exec(userAgent);

	if(navigator.userAgent.indexOf('Firefox') >= 0) return;

	if(match != null) return;

	var $ = jQuery = require('jquery');	
	require('easing');

	function scrollAnimate(){

		_scrLength = 200;
		_scrSpeed = 480;
		_scrEasing = 'easeOutQuad';
		//_scrEasing = 'swing';

		var mousewheelevent = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
		
		$(document).on(mousewheelevent,function(e)
		{
			e.preventDefault();
			var _delta = e.originalEvent.deltaY ? -(e.originalEvent.deltaY) : e.originalEvent.wheelDelta ? e.originalEvent.wheelDelta : -(e.originalEvent.detail);
			
			if( _delta < 0 )
			{
				_scrSet =  $( document ).scrollTop() + _scrLength;
			}
			else
			{
				_scrSet =  $( document ).scrollTop() - _scrLength;
			}
			
			$( 'html,body' )
			.stop()
			.animate({ scrollTop:_scrSet }, _scrSpeed, _scrEasing );
			return false;
		});
	};

	scrollAnimate();
});