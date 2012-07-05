Aria.classDefinition({
	$classpath : 'games.shoot.enemy.vreu.VreuBullet',
	$dependencies : ['games.common.sprite.AnimatedSpriteBuilder'],
	$extends : 'games.shoot.entity.AnimatedBullet',
	$constructor : function (x, y, angle) {
		var animatedSprite = games.common.sprite.AnimatedSpriteBuilder.buildFromFramesheetUrlAndRotate(
			'vreuBulletAnimated.png', 12, 60, 
			games.shoot.AssetManager, angle
		);
		this.$AnimatedBullet.constructor.call(this, x, y, angle, animatedSprite);
		this.__totalTime = 0;
		this.__scale = 0;
	},

	$prototype : {
		update : function (deltaTime) {
			this.__totalTime += deltaTime;
			if (this.__scale < 1) {
				this.__scale = Math.min(1, this.__totalTime * 0.005);
			}
			this.$AnimatedBullet.update.call(this, deltaTime);
		}
	}
});