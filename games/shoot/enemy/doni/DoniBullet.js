Aria.classDefinition({
	$classpath : 'games.shoot.enemy.doni.DoniBullet',
	$dependencies : ['games.common.sprite.AnimatedSpriteBuilder'],
	$extends : 'games.shoot.entity.AnimatedBullet',
	$constructor : function (x, y, angle, scale) {
		var animatedSprite = games.common.sprite.AnimatedSpriteBuilder.buildFromFramesheetUrlAndRotate(
			'enemyBulletAnimatedSmallRed.png', 10, 50,
			games.shoot.AssetManager, angle
		);
		this.$AnimatedBullet.constructor.call(this, x, y, angle, animatedSprite);
	}
});