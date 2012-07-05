Aria.classDefinition({
	$classpath : 'games.shoot.ship.ShipExplosionBuilder',
	$extends : 'games.common.BaseObject',
	$dependencies : [
		'games.common.animation.Animation',
		'games.shoot.entity.Explosion',
		'games.shoot.utils.Lol'
	],
	$statics : {
		forXY : function (x, y) {
			return new games.shoot.ship.ShipExplosionBuilder(x, y).build();
		},

		forPosition : function (position) {
			return games.shoot.ship.ShipExplosionBuilder.forXY(position.getX(), position.getY());
		},

		DURATION : 15
	},
	$constructor : function (x, y) {
		this.$BaseObject.constructor.call(this);
		this.__x = x;
		this.__y = y;

		var duration = this.$Lol.ICANHAZ ? this.DURATION * 4 : this.DURATION;
		var scale = this.$Lol.ICANHAZ ? 8 : 1;
		this.__animation = new this.$Animation(games.shoot.AssetManager.getAsset('shipExplosionAnimated.png'), 64, duration, scale);
	},
	$prototype : {
		build : function () {
			return new games.shoot.entity.Explosion(this.__animation, this.__x, this.__y);
		}
	}
});