Aria.classDefinition
	$classpath : 'games.audio.AudioLoader'
	$extends : 'games.common.BaseObject'
	$dependencies : [
		'games.common.input.MouseRecorder'
		'games.shoot.engine.ExtendedEngine'
		'games.common.clock.EngineClock'
		'games.audio.entity.SoundGenerator'
		'games.common.asset.AssetManager'
		'games.audio.Assets'
		'games.common.hitbox.SquareHitbox'
	]
	$statics : 
		MOUSELEFT : 'MOUSE_0'
		MOUSERIGHT : 'MOUSE_2'
	$constructor : (gameContainerId) ->
		@$BaseObject.constructor.call @
		@gameContainer = document.getElementById gameContainerId
		context = @createContext()
		@inputRecorder = new @$MouseRecorder
		@inputRecorder.start()

		@engine = @$ExtendedEngine.getDefaultImplementation context
		@engineClock = @$EngineClock.getDefaultImplementation @engine

		@engine.addController @

		games.shoot.AssetManager = @$AssetManager.getDefaultImplementation()
		games.shoot.AssetManager.setRootFolder 'resources/img/' 
		@assetManager = games.shoot.AssetManager

		@assetManager.queueDownloads @$Assets

		@assetManager.download
			fn :->
				@engineClock.start()
			scope : @

	$prototype :
		update : (delta) ->
			@inputRecorder.update()
			input = @inputRecorder.getInputByCode @MOUSELEFT 
			if input?.isCompleted() then @onLeftClick input

		onLeftClick : (input) ->
			[x, y] = @translateCoordinates input.getX(), input.getY()
			entity = @getEntityAtCoords x, y
			if entity then entity.makeNoise() else @createEntityAt x, y  

		createEntityAt : (x, y) ->
			soundGenerator = new this.$SoundGenerator x, y
			@engine.addEntity soundGenerator
			console.log "Added Entity at : X : '#{x}' and Y : '#{y}'"

		getEntityAtCoords : (x, y) ->
			entities = @engine.getEntities().filter (entity) =>
				@isOnEntity x, y, entity
			entities[0]

		translateCoordinates : (x, y) ->
			origX = @gameContainer.getBoundingClientRect().left
			origY = @gameContainer.getBoundingClientRect().top
			[x - origX, y - origY]

		createContext :->
			canvas = document.createElement 'canvas' 

			canvas.width = 480
			canvas.height = 640
			
			container = document.createElement 'div'
			container.className = "canvasContainer"

			container.appendChild canvas
			@gameContainer.appendChild container
			canvas.getContext '2d'

		isOnEntity : (x, y, entity) ->
			entity.getHitbox().intersects(new @$SquareHitbox x,y,0,0)

		conflictsWithEntity : (x, y, entity) ->
			entity.getHitbox().intersects(new @$SquareHitbox x-16,y-16,32,32)