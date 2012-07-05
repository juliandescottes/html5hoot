Aria.classDefinition
	$classpath : 'games.shoot.ship.ShipPilot'
	$extends : 'games.common.BaseObject'
	$dependencies: [
		'games.shoot.ship.ShipInputRecorder'
		'games.shoot.utils.RecorderFactory'
	]
	$constructor : (ship) ->
		@$BaseObject.constructor.call @
		@ship = ship
		@totalTime = 0
		@recorder = @createInputRecorder()
		@recorder.start()
		@
	$prototype :
		update : (deltaTime) ->
			@totalTime += deltaTime
			
			@recorder.update()

			if @recorder.getInputByCode "fireBullet" 
				@ship.fire deltaTime
			else
				@ship.haltFire deltaTime

			movementOrders = 
				up : if @recorder.getInputByCode("up") then 1 else 0 
				down : if @recorder.getInputByCode("down") then 1 else 0
				left : if @recorder.getInputByCode("left") then 1 else 0
				right : if @recorder.getInputByCode("right") then 1 else 0

			@ship.move deltaTime, movementOrders


		createInputRecorder :->
			kbRecorder = @$RecorderFactory.getKeyboardRecorder()
			return new @$ShipInputRecorder kbRecorder

