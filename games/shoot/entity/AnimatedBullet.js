 Aria.classDefinition({
	$classpath : 'games.shoot.entity.AnimatedBullet',
	$extends : 'games.shoot.entity.Bullet',
	$constructor : function (x, y, angle, animatedSprite, scale) {
		this.$Bullet.constructor.call(this, x, y);
		this.setAngle(angle);
		this.__scale = scale || 1;
		this.__animatedSprite = animatedSprite;
	},

	$prototype : {
		update : function (deltaTime) {
			this.$Bullet.update.call(this, deltaTime);
			this.__animatedSprite.update(deltaTime);
		},
		draw : function (context) {
			this.__animatedSprite.draw(this.__x, this.__y, context, this.__scale);
			this.getHitbox().draw(context);
		}
	}
});