Aria.classDefinition({
	$classpath : 'games.shoot.engine.OverlayEngine',
	$extends : 'games.common.engine.GameEngine',
	$implements : ['games.common.engine.Engine'],
	$dependencies : [
		'games.shoot.overlay.Overlay'
	],
	$statics : {
		getDefaultImplementation : function (playerController, context) {
			var timer = new games.common.clock.Timer(80);
			return new games.shoot.engine.OverlayEngine(playerController, context, timer);
		}
	},
	$constructor : function (playerController, context, timer) {
		this.$GameEngine.constructor.call(this, context, timer);
		this.__overlayController = new this.$Overlay(this, playerController);
	},
	$prototype : {
		update : function () {
			this.__overlayController.update();
			this.$GameEngine.update.call(this);
		}
	}
});