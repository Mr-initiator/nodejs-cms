define(function(require,exports,module){
	var $ = jQuery = require('jquery');
	require('easing');
	$.fn.lavalamp=function(options) {
		options=$.extend({
			gap:20,
			easeinel:'easeInOutElastic',
			ease:''
		},options);
		return this.each(function(){
			var $nav=$(this),					
				$current_item=$(this).find('.focus'),
				$lava=$('<li class="lava"></li>'),
				reset;
			$nav.css('position','relative')			
				.find('.top').css({
					position:'relative',
					zIndex:1
				});
			$lava.css({
				width:$current_item.outerWidth(),
				height:$current_item.outerHeight()+options.gap,
				backgroundColor:'#eee',
				position:'absolute',
				top:$current_item.position().top-(options.gap/2),
				left:$current_item.position().left
			}).appendTo($nav.find('ul'));
			$nav.find('li').bind('mouseover focusin',function(){
				$lava.animate({
					left:$(this).position().left,
					width:$(this).outerWidth()
				},{
					duration:400,
					easing:options.easeinel,
					queue:false
				})
			})
			.bind('mouseout focusout',function(){
					$lava.animate({
						left:$current_item.position().left,
						width:$current_item.outerWidth()
					},{
						duration:400,
						easing:options.ease,
						queue:false
					}/*,200*/);
			});
		});		
	};
});