Aria.classDefinition
	$classpath : 'games.common.input.StandardKeyboardRecorder'
	$extends : 'games.common.BaseObject'
	$implements : ['games.common.input.InputRecorder']
	$dependencies : ['games.shoot.utils.Console']
	$constructor : (keyboardRecorder) ->
		@$BaseObject.constructor.call @
		@keyboardRecorder = keyboardRecorder
		@
	$prototype :
		start :-> @keyboardRecorder.start()
		stop :-> @keyboardRecorder.stop()
		update : (time) -> @keyboardRecorder.update(time)
		getInputByCode : (code) ->
			input = @keyboardRecorder.getInputByCode  @translateToDeviceCode(code)
			return input if input?

		translateToDeviceCode : (code) ->
			switch code
				when 'ENTER' then 'KEYBOARD_13'
				when 'P' then 'KEYBOARD_80'
				when 'R' then 'KEYBOARD_82'
