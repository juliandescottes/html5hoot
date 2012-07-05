Aria.classDefinition
	$classpath : 'games.shoot.clock.StatsAwareEngineClock'
	$extends : 'games.common.clock.EngineClock'
	$constructor : (engine, animationLoop, statsRecorder) ->
		@$EngineClock.constructor.call @, engine, animationLoop
		@statsRecorder = statsRecorder
		@statsTool = @createStatsTool()
		@

	$prototype :
		createStatsTool :->
			stats = new Stats
			stats.setMode(0);
			stats.domElement.style.position = 'absolute'
			stats.domElement.style.left = '0px'
			stats.domElement.style.top = '0px'
			document.body.appendChild stats.domElement
			stats
		onLoop :->
			@statsTool.begin()
			beginTimestamp = Date.now()
			@$EngineClock.onLoop.call @
			@statsTool.end()
			@statsRecorder.updateTime "loop", Date.now() - beginTimestamp
