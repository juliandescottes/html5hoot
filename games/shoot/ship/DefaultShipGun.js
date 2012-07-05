Aria.classDefinition({
	$classpath : 'games.shoot.ship.DefaultShipGun',
	$extends : 'games.common.BaseObject',
	$dependencies : [
		'games.shoot.ship.ShipBullet',
		'games.shoot.entity.loot.powerup.Power',
		'games.shoot.utils.Lol'
	],
	$statics : {
		MAX_BULLETS : 10,
		INITIAL_BULLETS : 3,
		POWERDOWN_DELAY : 2000
	},
	$constructor : function (engine, bulletInterval) {
		this.$BaseObject.constructor.call(this);
		this.__engine = engine;
		this.__timeLastBulletWasFired = 0;
		this.__bulletInterval = bulletInterval;
		this.__bulletCount = this.INITIAL_BULLETS;
		this.__powerDownTime = 0;
	},
	$prototype : {
		fire : function (x, y) {
			if (this.__calculateTimeSinceLastBullet() > this.__bulletInterval) {
				this.__timeLastBulletWasFired = this.__getGameTimeUntilNow();
				this.__createBulletPattern(x, y);
			}
		},

		update : function (deltaTime) {
			if (this.__bulletCount > this.INITIAL_BULLETS) {
				this.__powerDownTime += deltaTime;
				if (this.__powerDownTime > this.INITIAL_BULLETS * this.POWERDOWN_DELAY / this.__bulletCount) {
					this.powerdown();
				}
			}
		},

		getPowerupStatus : function () {
			var status = {
				count : this.getBulletCount(),
				time : this.__powerDownTime,
				totalTime : this.INITIAL_BULLETS * this.POWERDOWN_DELAY / this.__bulletCount
			};
			return status;
		},

		getBulletCount : function () {
			return this.$Lol.ICANHAZ ? 40 : this.__bulletCount;
		},

		halt : function () {},

		destroy : function () {

		},

		powerup : function () {
			this.__bulletCount = Math.min (this.MAX_BULLETS, this.__bulletCount + 1);
			this.__powerDownTime = 0;
		},

		powerdown : function () {
			this.__bulletCount = Math.max (this.INITIAL_BULLETS, this.__bulletCount - 1);
			this.__powerDownTime = 0;
		},

		__createBulletPattern : function (x, y) {
			var bulletCount = this.getBulletCount();
			var maxBullets = this.$Lol.ICANHAZ ? 40 : this.MAX_BULLETS;
			var origin = -Math.PI/2 - (bulletCount-1) * Math.PI / maxBullets;
			for (var i = 0 ; i < bulletCount ; i++) {
				this.__createBullet(x, y, origin + i * 2 * Math.PI / maxBullets);
			}
		},

		__createBullet : function (x, y, angle) {
			var bullet = new this.$ShipBullet(x, y, angle);
			this.__engine.addEntity(bullet);
		},

		__calculateTimeSinceLastBullet : function () {
			return this.__getGameTimeUntilNow() - this.__timeLastBulletWasFired;
		},

		__getGameTimeUntilNow : function () {
			return this.__engine.getTimer().getTotalGameTime();
		},
	}
});