Aria.classDefinition
	$classpath : 'games.shoot.controller.loading.LoadingController'
	$extends : 'games.common.BaseObject'
	$dependencies : [
		'games.common.clock.EngineClock'
		'games.common.engine.GameEngine'
		'games.common.input.StandardKeyboardRecorder'
		'games.common.input.TouchInputRecorder'
		'games.common.utils.UserAgent'
		'games.shoot.asset.Assets'
		'games.shoot.controller.loading.AssetLoadingIndicator'
		'games.shoot.controller.loading.GameTitle'
		'games.shoot.controller.loading.InviteText'
		'games.shoot.engine.ExtendedEngine'
		'games.shoot.utils.RecorderFactory'
	]
	$events : {
		'complete' : 'fired when controller is done and should be replaced by next one'
	}
	$constructor : (assetManager, overlayContext) ->
		@$BaseObject.constructor.call(this);
		@assetManager = assetManager;

		if @$UserAgent.isTouchDevice()
			@recorder = new @$TouchInputRecorder
		else
			@recorder = new @$StandardKeyboardRecorder @$RecorderFactory.getKeyboardRecorder()

		@loadingEngine = @$ExtendedEngine.getDefaultImplementation(overlayContext);
		@loadingClock = @$EngineClock.getDefaultImplementation(@loadingEngine);
		@

	$prototype :
		start :->
			@loadingClock.start()
			@assetLoadingIndicator = new @$AssetLoadingIndicator
			@gameTitle = new @$GameTitle 

			@loadingEngine.addEntity entity for entity in [
				@assetLoadingIndicator
				@gameTitle
			]

			@loadingEngine.addController @
			@downloadAssets()

		update : (deltaTime) ->
			@recorder.update()
			if @recorderHasStartInput() then @leaveLoadingController()

		recorderHasStartInput :->
			if @$UserAgent.isTouchDevice() 
				@recorder.getInputByCode('TAP')
			else
				@recorder.getInputByCode('ENTER') 

		downloadAssets :->
			@assetManager.queueDownloads @$Assets
			@assetManager.$on
				assetLoaded : 
					fn : @onAssetLoaded
					scope : @

			@assetManager.download
				fn : @onAssetPreloadFinished
				scope : @

		leaveLoadingController :->
			@recorder.stop()		
			@loadingClock.stop()
			@$raiseEvent "complete"

		onAssetLoaded : (evt) ->
			@assetLoadingIndicator.setContent "#{evt.successCount-1}/#{evt.total}"

		onAssetPreloadFinished :->
			@assetLoadingIndicator.destroy()
			@displayPressEnter()
			@recorder.start()			

		displayPressEnter :->
			@loadingEngine.addEntity new @$InviteText()
