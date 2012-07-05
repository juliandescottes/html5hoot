Aria.classDefinition({
	$classpath : 'games.shoot.entity.loot.coin.Coin',
	$extends : 'games.shoot.entity.loot.LootImpl',
	$dependencies : [
		'games.common.sprite.AnimatedSpriteBuilder',
		'games.common.sprite.BlinkingSprite'
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
			Y : 0.2
		},
		INITIAL_SPEED : 0.7,
		VALUE : 500
	},
	$prototype : {
		_createSprite : function () {
			var transform = {
				angle : -Math.PI/2,
				scale : {x : 1, y : 1}
			}

			var animatedSprite = this.$AnimatedSpriteBuilder.buildFromUrlAndTransform(
				'coinAnimated.png', 20, 180, 
				games.shoot.AssetManager, transform
			);
		
			return new this.$BlinkingSprite(animatedSprite, 100);
		}
	}
});