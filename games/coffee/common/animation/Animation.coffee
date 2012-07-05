Aria.classDefinition
	$classpath : 'games.common.animation.Animation'
	$extends : 'games.common.BaseObject'
	$constructor : (image, frameWidth, frameDuration, scale) ->
		@$BaseObject.constructor.call @
		@__image = image
		@__frameWidth = frameWidth
		@__frameDuration = frameDuration
		@__frameHeight= image.height
		@__totalTime = (image.width / frameWidth) * frameDuration
		@__elapsedTime = 0
		@scale = scale || 1

	$prototype : 
		update : (deltaTime) ->
			@__elapsedTime += deltaTime

		draw : (context, x, y) ->
			index = @getCurrentFrame()
			locX = x - (@__frameWidth/2) * @scale
			locY = y - (@__frameHeight/2) * @scale
			context.drawImage(@__image, index*@__frameWidth, 0, @__frameWidth, @__frameHeight, locX, locY, @__frameWidth*@scale, @__frameHeight*@scale)

		isFinished :->
			return @__elapsedTime >= @__totalTime

		getCurrentFrame :->
			return Math.floor(@__elapsedTime / @__frameDuration)