Aria.classDefinition({
	$classpath : 'games.shoot.overlay.Points',
	$extends : 'games.common.text.Text',
	$implements : ['games.shoot.overlay.OverlayEntity'],
	$statics : {
		FONT_SIZE : '24pt',
		FONT_COLOR : '#ff8',
		FONT_FAMILY : 'Game'
	},
	$dependencies : [
		'games.shoot.utils.Environment'
	],
	$constructor : function () {
		this.$Text.constructor.call(this, this.FONT_FAMILY, this.FONT_SIZE, this.FONT_COLOR, 'right');
		this.setContent("0");
	},
	$prototype : {
		draw : function (context) {
			this.$Text.draw.call(this,
				this.$Environment.BOARD.WIDTH - 25, 
				this.$Environment.BOARD.HEIGHT - 50,
				context
			);
		}
	}
});