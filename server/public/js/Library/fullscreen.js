define(function(g,l,m){function h(a){a.requestFullscreen?a.requestFullscreen():a.mozRequestFullScreen?a.mozRequestFullScreen():a.webkitRequestFullScreen&&a.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)}function e(){document.exitFullscreen?document.exitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitCancelFullScreen&&document.webkitCancelFullScreen()}function k(a){b(document).on("fullscreenchange mozfullscreenchange webkitfullscreenchange",function(){a(document.fullscreen||
document.mozFullScreen||document.webkitIsFullScreen||!1)})}var b=jQuery=g("jquery");b.support.fullscreen=function(){var a=document.documentElement;return"requestFullscreen"in a||"mozRequestFullScreen"in a&&document.mozFullScreenEnabled||"webkitRequestFullScreen"in a}();b.fn.fullScreen=function(a){if(!b.support.fullscreen||1!==this.length)return this;if(document.fullscreen||document.mozFullScreen||document.webkitIsFullScreen)return e(),this;var d=b.extend({background:"#111",callback:b.noop(),fullscreenClass:"fullScreen"},
a),c=this,f=b("<div>",{css:{"overflow-y":"auto",background:d.background,width:"100%",height:"100%"}}).insertBefore(c).append(c);c.addClass(d.fullscreenClass);h(f.get(0));f.click(function(a){a.target==this&&e()});c.cancel=function(){e();return c};k(function(a){a||(b(document).off("fullscreenchange mozfullscreenchange webkitfullscreenchange"),c.removeClass(d.fullscreenClass).insertBefore(f),f.remove());d.callback&&d.callback(a)});return c};b.fn.cancelFullScreen=function(){e();return this}});