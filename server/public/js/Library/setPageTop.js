define(function(require,exports,module){

	var $ = jQuery = require('jquery');
	require('easing');

	function setPageTop(objEle){
		objEle.hide();
		
		$(window).scroll(function()
		{
			if($(this).scrollTop() > 100)
			{
				objEle.fadeIn();
	        }
	        else
			{
				objEle.fadeOut();
			}
		});
	 
	    objEle.click(function()
		{
	        $('html,body').animate({
	            scrollTop: 0
	        }, "easeOutQuad" );
	        return false;
	    });
	}

	exports.setPageTop = setPageTop;

});