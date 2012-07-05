Aria.classDefinition({
	$classpath : 'games.shoot.enemy.EnemyExplosionBuilder',
	$extends : 'games.common.BaseObject',
	$dependencies : [
		'games.common.animation.Animation',
		'games.shoot.entity.Explosion',
		'games.common.math.Random',
		'games.shoot.utils.Lol'
	],
	$statics : {
		forXY : function (x, y) {
			return new games.shoot.enemy.EnemyExplosionBuilder(x, y).build();
		},

		forPosition : function (position) {
			return games.shoot.enemy.EnemyExplosionBuilder.forXY(position.getX(), position.getY());
		},
		DURATION : 15
	},
	$constructor : function (x, y) {
		this.$BaseObject.constructor.call(this);
		this.__x = x;
		this.__y = y;

		var duration = this.$Lol.ICANHAZ ? this.DURATION * 4 : this.DURATION;
		var scale = this.$Lol.ICANHAZ ? 8 : 1;

		if (this.$Random.nextBoolean()) {
			var assetUrl = 'enemyExplosion3.png';
		} else {
			var assetUrl = 'enemyExplosion4.png';
		}
		this.__animation = new this.$Animation(games.shoot.AssetManager.getAsset(assetUrl), 64, duration, scale);
	},
	$prototype : {
		build : function () {
			return new games.shoot.entity.Explosion(this.__animation, this.__x, this.__y);
		}
	}
});