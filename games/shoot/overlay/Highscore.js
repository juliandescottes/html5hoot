Aria.classDefinition({
	$classpath : 'games.shoot.overlay.Highscore',
	$extends : 'games.common.text.Text',
	$implements : ['games.shoot.overlay.OverlayEntity'],
	$dependencies : [
		'games.shoot.utils.Environment'
	],
	$statics : {
		FONT_SIZE : '16pt',
		FONT_COLOR : '#ddf',
		FONT_FAMILY : 'Game'
	},
	$constructor : function () {
		this.$Text.constructor.call(this, this.FONT_FAMILY, this.FONT_SIZE, this.FONT_COLOR, 'right');
		this.setContent("0");
	},
	$prototype : {
		setContent : function (content) {
			this.$Text.setContent.call(this, "HIGHSCORE : " + content)
		},
		draw : function (context) {
			this.$Text.draw.call(this,
				this.$Environment.BOARD.WIDTH - 25, 
				20,
				context
			);
		}
	}
});