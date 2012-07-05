Aria.classDefinition({
	$classpath : 'games.common.clock.BrowserAnimationHelper',
	$constructor : function () {
		this.__requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||  
		window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {window.setTimeout(callback, 1000/60)}; 
	},
	$prototype : {
		requestRepaint : function (method, scope) {
			this.__requestAnimationFrame.call(window, function(){method.call(scope)});
		}
	}	
})