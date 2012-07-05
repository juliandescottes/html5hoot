Aria.classDefinition({
	$classpath : 'games.shoot.enemy.vreu.VreuGun',
	$extends : 'games.common.BaseObject',
	$dependencies : [
		'games.shoot.enemy.vreu.VreuBullet',
		'games.common.math.Random',
		'games.shoot.utils.Environment'
	], 
	$implements : [],
	$statics : {
		BIG_COOLDOWN : 4000,
		COOLDOWN : 150,
		CONSECUTIVE_SHOTS : 3,
		BULLET_SPEED : 0.15
	},
	$constructor : function (vreuPositionEngine, engine) {
		this.$BaseObject.constructor.call(this);
		
		this.__timeSinceLastBullet = this.$Random.nextInt(1000) - 1000;
		this.__shots = 0;

		this.__positionEngine = vreuPositionEngine;
		this.__direction = vreuPositionEngine.getX() <= 0;
		this.__engine = engine;
		this.__angleVariant = (this.$Random.nextInt(10) * 0.05);

	},
	$prototype : {
		update : function (deltaTime) {
			if (this.__isInGameZone()) {
				this.__timeSinceLastBullet += deltaTime;	
			}			
		},

		fire : function () {
			if (this.__cooldownExpired()) {
				this.__shots++;
				this.__createBulletPattern();

				if (this.__shots == this.CONSECUTIVE_SHOTS) {
					this.__shots = 0;
					this.__timeSinceLastBullet = -this.COOLDOWN - this.BIG_COOLDOWN;
				} else {
					this.__timeSinceLastBullet = 0;
				}
			}
		},

		__cooldownExpired : function () {
			return this.__timeSinceLastBullet > this.COOLDOWN;
		},

		__createBulletPattern : function () {
			var xMod = this.__direction ? 5 : -5;
			var x = this.__positionEngine.getX() - xMod;
			var y = this.__positionEngine.getY() - 5;
			for (var i = 0 ; i < 12 ; i++) {
				var angle = i * (Math.PI/6) + this.__angleVariant;
				var bullet = new this.$VreuBullet(x, y, angle);
				bullet.setSpeed(this.BULLET_SPEED);
				bullet.setGroup(bullet.GROUPS.ENEMY);
				this.__engine.addEntity(bullet);
			}
		},

		__isInGameZone : function () {
			var isInX = this.__positionEngine.getX() > -10 && this.__positionEngine.getX() < this.$Environment.BOARD.WIDTH + 10;
			var isInY = this.__positionEngine.getY() > -10 && this.__positionEngine.getY() < this.$Environment.BOARD.HEIGHT + 10;
			return isInY && isInX;
		}
	}
});