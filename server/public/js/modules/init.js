define(function(require,exports,module){
	//引入JQUERY
	var $ = jQuery = require('jquery');
	window.$ = window.$ || $;

	require('imageScale');
	require('lazyloadxt');
	require('scrolltofixed');
	require('device');

	require.async('mmenu',function(){
		$("#my-menu").mmenu({
	        classes: "mm-light mm-zoom-menu mm-zoom-panels",
	        extensions: ["theme-white","effect-slide-menu", "effect-slide-listitems","pageshadow","border-full"],
	        searchfield: false,
	        offCanvas: {
	           position  : "right",
	           zposition : "after"
	    	}
	     })

		$(".hamburger").click(function() {
	         $("#my-menu").trigger("open.mm");
	    });
	});

	var classArray = ['best-fill','best-fit-down','best-fit','fill','none'];

	$.extend($.lazyLoadXT,{
		forceLoad:true,
		onload:function(){

			for(var i=0;i<5;i++){

				if($(this).hasClass(classArray[i])){

					scales($(this),classArray[i],'center',500);
					
					return;

				}
			}
		}
	});

	function scales(object,method,position,fadeTime){
		object.imageScale({scale:method,align:position,fadeInDuration:fadeTime});
	}

	var searchButton = $('#search-button'),
		search = $('#search'),
		searchInp = search.find('.body-input'),
		searchBody = search.find('.search-body');

	searchButton.on('click',function(){

		$(this).toggleClass('active');

		if($(this).hasClass('active')){

			search.show().stop().animate({
				opacity:1,
				top:60
			},240,function(){

				search.find('.body-input').focus();

			})

		}else{

			search.show().stop().animate({
				opacity:0,
				top:-20
			},240,function(){

				search.hide();

			});

		}

	});


	searchInp.focus(function(){

		searchBody.css('border','1px solid #45B6F7');

	});

	searchInp.blur(function(){

		searchBody.css('border','1px solid #ddd');

	});

	
	var fixHeader = $('#fix-header');

	device.desktop() && fixHeader.scrollToFixed();

	$(window).resize(function(){

		if($(window).width() < 1199){

			$('div:empty').hide()

		}

	}).resize();
	



});
