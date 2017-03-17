define(function(require,exports,module){

	var $ = jQuery = require('jquery');

	function tabsFun(options){

		if(!options.tabsTit) return false;

		tabsTit = options.tabsTit;
		tabsCnt = options.tabsCnt;
		aClass = options.aClass || 'z-hov';
		events = options.events || 'click';
		switchFn = options.switchFn || function(){}

		$(tabsTit).each(function(index,element){
			$(element).on(events,function(){
				$(element).addClass(aClass).siblings().removeClass(aClass);
				$(tabsCnt).eq(index).show().siblings().hide();
				switchFn(index);
			})
		});
	}

	window.tabsFun = tabsFun;

});