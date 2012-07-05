Aria.classDefinition
	$classpath : 'games.shoot.controller.loading.InviteText'
	$extends : 'games.common.text.Text'
	$implements : ['games.shoot.overlay.OverlayEntity']
	$dependencies : [
		'games.shoot.utils.Environment'
		'aria.utils.Math'
		'games.common.utils.UserAgent'
		'games.common.sprite.BlinkingSprite'
	]
	$statics : 
		FONT_SIZE : '36px'
		FONT_COLOR : 'white'
		FONT_FAMILY : 'Game'
		SPEED : 0.1
		END_Y : 400
	$constructor :->
		@$Text.constructor.call @, @FONT_FAMILY, @FONT_SIZE, @FONT_COLOR, 'center', 'middle'
		if @$UserAgent.isTouchDevice()
			@setContent "Touch to Start"
		else
			@setContent "Press ENTER"

		@y = @$Environment.BOARD.HEIGHT
		at = @
		fakeSprite = 
			draw : (x, y, c) ->
				at.$Text.draw.call(at, x, y, c)
		
		@sprite = new @$BlinkingSprite(fakeSprite, 350)
		@sprite.setBlinking true
		@
	$prototype : 
		update : (deltaTime) ->
			@sprite.update deltaTime
			@y = Math.max @y - deltaTime * @SPEED, @END_Y

		draw : (context) ->
			@sprite.draw(@$Environment.BOARD.WIDTH/2, @y, context)