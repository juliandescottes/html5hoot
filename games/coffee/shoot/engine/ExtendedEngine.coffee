Aria.classDefinition
	$classpath : 'games.shoot.engine.ExtendedEngine'
	$extends : 'games.common.BaseObject'
	$implements : ['games.common.engine.Engine']
	$dependencies : [
		'games.common.clock.Timer'
		'games.common.engine.GameEngine'
	]
	$statics :
		getDefaultImplementation : (context) ->
			timer = new games.common.clock.Timer 16
			baseEngine = new games.common.engine.GameEngine(context, timer)
			new games.shoot.engine.ExtendedEngine baseEngine

	$constructor : (baseEngine) ->
		@baseEngine = baseEngine
		@controllers = []
		@
	$prototype :
		getEntities :->	@baseEngine.getEntities()
		setEntities : (entities) -> @baseEngine.setEntities entities
		getTimer :-> @baseEngine.getTimer()
		addEntity : (entity) -> @baseEngine.addEntity entity
		addController : (controller) -> @controllers.push(controller)
		update :-> 
			controller.update() for controller in @controllers
			@baseEngine.update()
		draw :-> @baseEngine.draw()