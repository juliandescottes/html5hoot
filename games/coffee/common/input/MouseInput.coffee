Aria.classDefinition
	$classpath : 'games.common.input.MouseInput'
	$extends : 'games.common.input.DefaultInput'
	$constructor : (code, @event)->
		@$DefaultInput.constructor.call @, code
		@
	$prototype : 
		updateEvent : (@event) ->
		getX :->
			@event.clientX
		getY :->
			@event.clientY