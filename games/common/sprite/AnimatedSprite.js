Aria.classDefinition({
	$classpath : 'games.common.sprite.AnimatedSprite',
	$extends : 'games.common.BaseObject',
	$implements : [],
	$constructor : function (sprites, frameDuration) {
		this.$BaseObject.constructor.call(this);
		this.__sprites = sprites;
		this.__frameDuration = frameDuration;
		this.__totalDuration = sprites.length * frameDuration; 
		this.__elapsedTime = 0;
	},
	$prototype : {
		update : function (deltaTime) {
			this.__elapsedTime += deltaTime;
		},

		draw : function (x, y, context, scale) {
			 this.__getCurrentSprite().draw(x, y, context, scale);
		},

		rotate : function (angle) {
			for (var i = 0 ; i < this.__sprites.length ; i++) {
				this.__sprites[i].rotate(angle);
			}				
		},

		scale : function (scaleX, scaleY) {
			for (var i = 0 ; i < this.__sprites.length ; i++) {
				this.__sprites[i].scale(scaleX, scaleY);
			}
		},

		__getCurrentSprite : function () {
			var spriteIndex = Math.floor(this.__elapsedTime / this.__frameDuration);
			return this.__sprites[spriteIndex%this.__sprites.length];
		}
	}
});