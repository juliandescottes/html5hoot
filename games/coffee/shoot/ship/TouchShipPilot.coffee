Aria.classDefinition
	$classpath : 'games.shoot.ship.TouchShipPilot'
	$extends : 'games.common.BaseObject'
	$dependencies: [
		'games.shoot.utils.RecorderFactory'
	]
	$constructor : (ship) ->
		@$BaseObject.constructor.call @
		@ship = ship
		@totalTime = 0
		@recorder = @$RecorderFactory.getTouchInputRecorder()
		@recorder.start()
		@
	$prototype :
		update : (deltaTime) ->
			@totalTime += deltaTime
			@recorder.update()

			movementOrders =
				right : 0
				left : 0
				up : 0
				down : 0

			tapInput = @recorder.getInputByCode "TAP" 
			if tapInput
				@ship.fire deltaTime
			else
				@ship.haltFire deltaTime

			moveInput = @recorder.getInputByCode "MOVE" 
			if moveInput
				if moveInput.x > 0 then movementOrders.right = 1
				if moveInput.x < 0 then movementOrders.left = 1
				if moveInput.y < -5 then movementOrders.down = 1
				if moveInput.y > -5 then movementOrders.up = 1

			@ship.move deltaTime, movementOrders