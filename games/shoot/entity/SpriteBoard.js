Aria.classDefinition({
	$classpath : 'games.shoot.entity.SpriteBoard',
	$extends : 'games.common.entity.DestroyableEntity',
	$dependencies : [
		'games.common.sprite.SpritePattern',
		'games.shoot.utils.Environment'
	], 
	$implements : ['games.common.entity.Entity'],
	$statics : {
		DEFAULT_SPEED : 0.05,
		SPRITE_HEIGHT : 1000
	},
	$constructor : function () {
		this.$DestroyableEntity.constructor.call(this);
		if (window.location.href.toLowerCase().indexOf("original") != -1) {
			var backgroundUrl = 'backgroundBig.png';
		} else {
			var backgroundUrl =  'backgroundBigJungle.png';
		}

		this.__spritePattern = this.$SpritePattern.buildForSpriteUrl(backgroundUrl, games.shoot.AssetManager);
		this.__spritePattern.setSpriteHeight(this.SPRITE_HEIGHT);
		this.__startY = -this.SPRITE_HEIGHT;
	},
	$prototype : {
		update : function (deltaTime) {
			var positionDelta = this.DEFAULT_SPEED * deltaTime;
			this.__startY = ((this.__startY + positionDelta) % this.SPRITE_HEIGHT) - this.SPRITE_HEIGHT;
		},
		draw : function(context) {
			this.__spritePattern.draw(this.$Environment.BOARD.WIDTH/2, this.__startY, 800, context);
		}
	}
});