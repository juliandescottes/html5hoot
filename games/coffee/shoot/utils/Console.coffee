Aria.classDefinition
	$classpath : 'games.shoot.utils.Console'
	$extends : 'games.common.BaseObject'
	$singleton : true
	$constructor :-> 
		@domElement = document.getElementById("htmlshoot-console") 
		@
	$prototype :
		log : (message) ->
			message = "<div>&gt;&nbsp;#{message}</div>"
			html = @domElement.innerHTML 
			@domElement.innerHTML = message + html