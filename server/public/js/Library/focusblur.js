define(function(require,exports,module){
	var $ = jQuery = require('jquery');
	jQuery.focusblur=function(a){var b=$(a),c=b.val();b.focus(function(){var a=$(this).val();a==c&&$(this).val("")}),b.blur(function(){var a=$(this).val();""==a&&$(this).val(c)})}
});
// 调用 $.focusblur("#searchkey");