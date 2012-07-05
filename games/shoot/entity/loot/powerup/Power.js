Aria.classDefinition({
	$classpath : 'games.shoot.entity.loot.powerup.Power',
	$extends : 'games.shoot.entity.loot.LootImpl',
	$dependencies : [
		'games.common.sprite.AnimatedSpriteBuilder',
		'games.common.sprite.BlinkingSprite',
	], 
	$implements : [
		'games.shoot.entity.loot.Loot',
		'games.shoot.entity.TractableEntity'
	],
	$statics : {
		SIZE : 20,
		EXPIRATION_TIME : 7000,
		SPEED : {
			X : 0,
			Y : 0.05
		},
		INITIAL_SPEED : 0.4,
		VALUE : 2000
	},
	$prototype : {
		_createSprite : function () {
			var animatedSprite = this.$AnimatedSpriteBuilder.buildFromFramesheetUrlAndRotate(
				'powerupanimated.png', 20, 120, 
				games.shoot.AssetManager, -Math.PI/2
			);
		
			return new this.$BlinkingSprite(animatedSprite, 100);
		}
	}
});