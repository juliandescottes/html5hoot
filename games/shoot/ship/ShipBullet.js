Aria.classDefinition({
	$classpath : 'games.shoot.ship.ShipBullet',
	$dependencies : ['games.common.sprite.Sprite'],
	$extends : 'games.shoot.entity.Bullet',
	$statics : {
		SPEED : 0.5,
		RADIUS : 3
	},
	$constructor : function (x, y, angle) {
		this.$Bullet.constructor.call(this, x, y);
		this.setSpeed(this.SPEED);
		this.setRadius(this.RADIUS);
		this.setAngle(angle);
		this.setGroup(this.$Bullet.GROUPS.PLAYER);

		this.__spriteRenderer = this.$Sprite.buildForSpriteUrl('shipBullet.png', angle, games.shoot.AssetManager);
	},

	$prototype : {
		draw : function (context) {
			this.__spriteRenderer.draw(this.__x, this.__y, context);
			this.getHitbox().draw(context);
		}
	}
});