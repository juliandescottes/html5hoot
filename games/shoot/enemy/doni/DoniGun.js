Aria.classDefinition({
	$classpath : 'games.shoot.enemy.doni.DoniGun',
	$extends : 'games.common.BaseObject',
	$dependencies : [
		'games.shoot.enemy.doni.DoniBullet',
		'games.common.math.Random'
	], 
	$implements : [],
	$statics : {
		COOLDOWN : 5000	
	},
	$constructor : function (doniPositionEngine, engine) {
		this.$BaseObject.constructor.call(this);
		this.__timeSinceLastBullet = 4000;
		this.__positionEngine = doniPositionEngine;
		this.__engine = engine;
	},
	$prototype : {
		update : function (deltaTime) {
			this.__timeSinceLastBullet += deltaTime;
		},

		fire : function () {
			if (this.__cooldownExpired()) {
				this.__timeSinceLastBullet = 0;
				this.__createBulletPattern();
			}
		},

		__cooldownExpired : function () {
			return this.__timeSinceLastBullet > this.COOLDOWN;
		},

		__createBulletPattern : function () {
			var x = this.__positionEngine.getX();
			var y = this.__positionEngine.getY() + 15;
			var angleVariant = 0.05;
			for (var i = 0 ; i < 3 ; i++) {
				var angle = Math.PI/2 + (this.$Random.nextInt(10) * angleVariant) - (5 * angleVariant);
				var bullet = new this.$DoniBullet(x - 15 + (i*15), y, angle);
				bullet.setSpeed(0.10 + (this.$Random.nextInt(10) / 100));
				bullet.setGroup(bullet.GROUPS.ENEMY);
				this.__engine.addEntity(bullet);
			}
		} 
	}
});