Aria.classDefinition
	$classpath : 'games.common.utils.UserAgent'
	$extends : 'games.common.BaseObject'
	$statics : 
		isTouchDevice :->
			@isTouchAgent @getUserAgent()
		isTouchAgent : (agent) ->
			return agent.match(/ipad|iphone|android/ig)
		getUserAgent :->
			return window.navigator.userAgent