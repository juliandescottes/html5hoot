Aria.classDefinition
	$classpath : 'games.common.clock.AnimationLoop'
	$extends : 'games.common.BaseObject'
	$dependencies : ['games.common.clock.BrowserAnimationHelper']
	$constructor :->
		@$BaseObject.constructor.call @
		@isRunning = false
		@browserAnimationHelper = new @$BrowserAnimationHelper
		@

	$prototype : 
		setLoopCallback : (method, scope) ->
			@loopCallback = 
				fn : method
				scope : scope
		
		start :->
			@isRunning = true
			@loop()
		
		loop :->
			@executeLoop() if @isRunning

		executeLoop :->
			@$callback @loopCallback
			@browserAnimationHelper.requestRepaint @loop, @
		
		stop :->
			@isRunning = false
			@callback = null
		
		isOn :->
			return @isRunning

	$destructor :->
		@stop()
		@browserAnimationHelper.$dispose()
