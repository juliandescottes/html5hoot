Aria.classDefinition
	$classpath : 'games.audio.entity.SoundGenerator'
	$extends : 'games.common.entity.DestroyableEntity'
	$dependencies : [
		'games.common.sprite.Sprite'
		'games.common.sprite.SpriteBuilder'
		'games.common.hitbox.SquareHitbox'
	]
	$constructor : (@x, @y) ->
		@$DestroyableEntity.constructor.call @
		transform = 
			angle : -Math.PI/2
			scale :
				x : 1
				y : 1

		if @x > 240 then transform.scale.x = -1

		@sprite = @$SpriteBuilder.build 'soundGenerator.png', transform
		@hitbox = new @$SquareHitbox x-16, y-16, 32, 32
		@context = new webkitAudioContext
		@loadSound()
		@
	$prototype :
		draw : (context) ->
			@sprite.draw @x, @y, context
			@hitbox.draw context
		getHitbox :-> @hitbox
		makeNoise :-> 
			source = @context.createBufferSource()
			source.buffer = @buffer
			source.connect @context.destination
			source.noteOn 0  
			
		loadSound :->
			request = new XMLHttpRequest
			url = 'resources/sounds/m4a1.mp3'
			request.open 'GET', url, true
			request.responseType = 'arraybuffer'
			request.onload = =>
			    @context.decodeAudioData(
			    	request.response
			    	(@buffer) =>  
			    	->
			    )
		  	request.send()
