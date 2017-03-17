define(function(require,exports,module){
    var $ = jQuery = require('jquery');
	$.fn.AntLine = function(){
        var borTop = $('<div/>'),borBottom = $('<div/>'),borLeft = $('<div/>'),borRight = $('<div/>');
        var cssText_1 = {width:3000,left:-1500,borderTop:'2px dashed #feeaa1',position:'absolute'},
        	cssText_2 = {position:'absolute',height:3000,top:-1500,borderLeft:'2px dashed #feeaa1'}
    	borTop.css({top:0}).css(cssText_1);
    	borBottom.css({bottom:0}).css(cssText_1);
    	borLeft.css({left:0}).css(cssText_2);
    	borRight.css({right:0}).css(cssText_2);
    	$(this).css({position:'relative',zoom:1,overflow:'hidden'}).append(borTop,borBottom,borLeft,borRight);
        var left = borTop.position().left,
            top = borLeft.position().top;
        setInterval(function () {
            if (left < 0) {
                left += 2;
                borRight.css({top:left})
                borTop.css({left:left})
            }else left = -1500;
            if (top > -3000) {
                top -= 2;
                borBottom.css({left:top})
                borLeft.css({top:top})
            } else top = -1500;
        }, 60);
	};
})