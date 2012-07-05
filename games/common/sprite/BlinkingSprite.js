Aria.classDefinition({
	$classpath : 'games.common.sprite.BlinkingSprite',
	$extends : 'games.common.BaseObject',
	$dependencies : [], 
	$implements : ['games.common.sprite.Drawable'],
	$constructor : function (sprite, period) {
		this.$BaseObject.constructor.call(this);
		this.__period = period;
		this.__sprite = sprite;
		this.__timeCount = 0;
	},
	$prototype : {
		update : function (deltaTime) {
			this.__timeCount += deltaTime;
			if (this.__sprite.update) {
				this.__sprite.update(deltaTime);
			}
		},

		draw : function (x, y, context) {
			if (this.__isBlinking) {
				this.__blinkDraw(x, y, context);
			} else {
				this.__sprite.draw(x, y, context);
			}
			
		},

		setBlinking : function (isBlinking) {
			this.__isBlinking = isBlinking;
		},

		__blinkDraw : function (x, y, context) {
			if (this.__timeCount % (2 * this.__period) > this.__period) {
				this.__sprite.draw(x, y, context);
			}
		}
	}
});