Aria.classDefinition
	$classpath : 'games.shoot.overlay.PlusPoints'
	$extends : 'games.common.text.Text'
	$statics : {
		FONT_SIZE : '24pt'
		FONT_COLOR_RGB : '170,170,255'
		FONT_FAMILY : 'Game'
	}
	$constructor : (x, y, points) ->
		this.$Text.constructor.call(this, this.FONT_FAMILY, this.FONT_SIZE, this.FONT_COLOR, 'right')
		this.setContent("+" + points);