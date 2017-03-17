define(function(require,exports,module){

	 var $ = jQuery = require('jquery');

	jQuery.fn.jZebro = function(options) {

		var options = jQuery.extend({

				thClasses :	"thFont thSize thColor thBg thPadding",
				tdClasses :	"tdFont tdSize tdColor tdBg tdPadding",
			trEvenClasses :	"trEven",
			 trOddClasses :	"trOdd",
				 divWidth : jQuery('div').width() - 20,
				divMargin : "10px auto"
			 
		}, options);
		
		
		return this.each(function() {		
			 
			jQuery(this).find('th').attr('class',options.thClasses);
			
			jQuery(this).find('td').attr('class',options.tdClasses);
			 
			jQuery(this).find('tbody tr:even').attr('class',options.trEvenClasses);
			 
	        jQuery(this).find('tbody tr:odd').attr('class', options.trOddClasses);

			jQuery('table').css({
					"width"  : options.divWidth,
					"margin" : options.divMargin
			});
	        
		});
	};
})
