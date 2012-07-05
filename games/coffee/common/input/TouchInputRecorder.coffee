Aria.classDefinition
	$classpath : 'games.common.input.TouchInputRecorder'
	$extends : 'games.common.input.BasicInputRecorder'
	$dependencies : [
		'aria.utils.Event'
		'aria.core.Timer'
		'games.shoot.utils.Console'
		'games.common.input.DefaultInput'
	]
	$constructor :->
		@$BasicInputRecorder.constructor.call @
		@gameContainer = document.getElementById "gameContainer"
		@
	$prototype :
		start :->
			@$Event.addListener @gameContainer, "touchstart", {fn : @onTouchStart, scope : @}
			@$Event.addListener document, "touchend", {fn : @onTouchEnd, scope : @}
			@$Event.addListener document, "touchmove", {fn :@onTouchMove, scope : @}
			@$Event.addListener window, "devicemotion", {fn :@onDeviceMotion, scope:@}
		stop :->
			@$Event.removeListener @gameContainer, "touchstart", {fn : @onTouchStart, scope : @}
			@$Event.removeListener @gameContainer, "touchend", {fn : @onTouchEnd, scope : @}
		onDeviceMotion : (event) ->
			acceleration = event.accelerationIncludingGravity
			input = @getInputByCode 'MOVE' 
			if !input
				input = new this.$DefaultInput 'MOVE', @_currentGameTime
				@addInputAndPrevent input, event

			input.x = acceleration.x
			input.y = acceleration.y
			input.z = acceleration.z
			event.preventDefault();
			
		onTouchEnd : (evt) ->
			switch evt.touches.length
				when 0 
					input = @getInputByCode('TAP')
					if input then input.complete()
				when 1 
					input = @getInputByCode('DOUBLETAP')
					if input then input.complete()

			event.preventDefault();

		onTouchStart : (evt) ->
			if evt.touches.length == 2 
				input = new this.$DefaultInput 'DOUBLETAP', @_currentGameTime
			else if evt.touches.length == 1 
				input = new this.$DefaultInput 'TAP', @_currentGameTime
			if !@getInputByCode input.getCode()
				@addInputAndPrevent input, evt
		
		onTouchMove : (event) ->
			event.preventDefault();
		addInputAndPrevent : (input, event) ->
			@addInput input
			#@$Console.log("#{input.getCode()} : #{event.touches.length} : #{input.x} : #{input.y}")
			event.preventDefault()


