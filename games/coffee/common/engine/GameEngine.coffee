Aria.classDefinition
	$classpath : 'games.common.engine.GameEngine'
	$extends : 'games.common.BaseObject'
	$dependencies : [
		'aria.utils.Array'
		'games.common.assert.Assert'
		'games.common.entity.Entity'
		'games.common.clock.AnimationLoop'
		'games.common.clock.Timer'
	]
	$implements : ['games.common.engine.Engine']
	$statics : 
		getDefaultImplementation : (context) ->
			timer = new games.common.clock.Timer 50
			new games.common.engine.GameEngine context, timer

	$constructor : (context, timer) ->
		@$BaseObject.constructor.call @
		@timer = @$Assert.isInstanceOf timer, 'games.common.clock.Timer'
		@context = context
		@entities = []
		@

	$prototype :	
		addEntity : (entity) ->
			@$Assert.isInstanceOf entity, 'games.common.entity.Entity'
			@entities.push entity

		update :->
			@timer.update()
			delta = @timer.getDelta()

			for i in [@entities.length - 1..0] by -1
				@updateEntity @entities[i], delta

		draw :->
   			@context.save()
		    @context.clearRect(0, 0, @context.canvas.width, @context.canvas.height)
		    entity.draw @context for entity in @entities
		    @context.restore()

		removeEntity : (entity) ->
			@$Array.remove @entities, entity
		
		updateEntity : (entity, delta) ->
			if entity.isDestroyed()
				@removeEntity entity
			else 
				entity.update delta, @timer

		getTimer :-> @timer
		getEntities :->	@entities
		setEntities : (@entities) ->