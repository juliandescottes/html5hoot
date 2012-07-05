Aria.classDefinition
	$classpath : 'games.shoot.controller.level.LevelController'
	$extends : 'games.common.BaseObject'
	$dependencies : [
		'games.common.clock.AnimationLoop'
		'games.common.clock.EngineClock'
		'games.common.engine.GameEngine'
		'games.common.input.StandardKeyboardRecorder'
		'games.shoot.clock.StatsAwareEngineClock'
		'games.shoot.enemy.generator.ShootEnemyGenerator'
		'games.shoot.engine.ExtendedEngine'
		'games.shoot.engine.OverlayEngine'
		'games.shoot.engine.ShootEngine'
		'games.shoot.overlay.Overlay'
		'games.shoot.overlay.Pause'
		'games.shoot.player.PlayerController'
		'games.shoot.ship.ShipInputRecorder'
		'games.shoot.Stats'
		'games.shoot.utils.RecorderFactory'
	]
	$constructor : (gameContext, overlayContext)->
		@$BaseObject.constructor.call(this);

		kbRecorder = @$RecorderFactory.getKeyboardRecorder()

		statsRecorder = new this.$Stats();

		@gameEngine = @$ShootEngine.getDefaultImplementation gameContext, statsRecorder
		@gameClock = new @$StatsAwareEngineClock @gameEngine, new @$AnimationLoop, statsRecorder

		shipRecorder = new @$ShipInputRecorder kbRecorder
		@playerController = new this.$PlayerController @gameEngine, shipRecorder
		@enemyController = new this.$ShootEnemyGenerator @gameEngine 

		@recorder = new @$StandardKeyboardRecorder kbRecorder

		@overlayEngine = @$ExtendedEngine.getDefaultImplementation overlayContext
		@overlayClock = @$EngineClock.getDefaultImplementation @overlayEngine

		@

	$prototype :
		start :->
			@gameEngine.addController @playerController
			@gameEngine.addController @enemyController
			
			@overlayEngine.addController this
			@overlayEngine.addController new @$Overlay(@overlayEngine, @playerController)

			@gameClock.start()
			@overlayClock.start()

		update : (deltaTime) ->
			@recorder.update()
			if @recorder.getInputByCode 'P' 
				@pause()
			if @recorder.getInputByCode 'R' 
				@resume()

		toggleEngine :->
			if @gameClock.isOn() then @pause() else @resume()

		pause :->
			unless @pauseEntity
				@pauseEntity = new this.$Pause(); 
				@overlayEngine.addEntity @pauseEntity
				@gameClock.stop();

		resume :->
			if @pauseEntity
				@pauseEntity.destroy()
				@pauseEntity = null
				@gameClock.start()
