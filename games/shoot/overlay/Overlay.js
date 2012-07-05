Aria.classDefinition({
	$classpath : 'games.shoot.overlay.Overlay',
	$extends : 'games.common.BaseObject',
	$dependencies : [
		'games.shoot.overlay.Points',
		'games.shoot.overlay.Highscore',
		'games.shoot.overlay.PowerupCountdown'
	],
	$constructor : function (engine, player) {
		this.$BaseObject.constructor.call(this);
		
		this.__player = player;
		this.__engine = engine;

		this.__points = new this.$Points();
		this.__highscore = new this.$Highscore();
		this.__powerupCountdown = new this.$PowerupCountdown();

		this.__engine.addEntity(this.__points);
		this.__engine.addEntity(this.__highscore);
		this.__engine.addEntity(this.__powerupCountdown);
	},
	$prototype : {
		update : function () {
			this.__points.setContent(this.__player.getPoints());
			this.__highscore.setContent(this.__player.getHighscore());
			this.__powerupCountdown.setContent(this.__player.getPowerupCountdown())
		}
	}
});