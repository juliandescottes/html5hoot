Aria.classDefinition
	$classpath : 'games.shoot.controller.loading.GameTitle'
	$extends : 'games.common.text.Text'
	$implements : ['games.shoot.overlay.OverlayEntity']
	$dependencies : ['games.shoot.utils.Environment']
	$statics : 
		FONT_SIZE : '52px'
		FONT_COLOR : 'white'
		FONT_FAMILY : 'Game'
	$constructor :->
		@$Text.constructor.call @, @FONT_FAMILY, @FONT_SIZE, @FONT_COLOR, 'center', 'middle'
		@setContent "HTML 5H007"
		@
	$prototype : 
		draw : (context) ->
			@$Text.draw.call @, @$Environment.BOARD.WIDTH/2, 200, context
	