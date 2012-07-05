Aria.classDefinition({
	$classpath : 'games.shoot.controller.loading.AssetLoadingIndicator',
	$extends : 'games.common.text.Text',
	$implements : ['games.shoot.overlay.OverlayEntity'],
	$dependencies : [
		'games.shoot.utils.Environment'
	],
	$statics : {
		FONT_SIZE : '18px',
		FONT_COLOR : 'white',
		FONT_FAMILY : 'Game'
	},
	$constructor : function () {
		this.$Text.constructor.call(this, this.FONT_FAMILY, this.FONT_SIZE, this.FONT_COLOR, 'center', 'middle');
		this.setContent("0");
	},
	$prototype : {
		setContent : function (content) {
			this.$Text.setContent.call(this, "Loading Asset  : " + content)
		},
		draw : function (context) {
			this.$Text.draw.call(this,
				this.$Environment.BOARD.WIDTH/2,
				this.$Environment.BOARD.HEIGHT/2,
				context
			);
		}
	}
});