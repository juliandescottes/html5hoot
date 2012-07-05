Aria.classDefinition({
	$classpath : 'games.shoot.player.PlayerController',
	$extends : 'games.common.BaseObject',
	$dependencies : [
		'games.common.assert.Assert',
		'games.shoot.ship.Ship',
		'games.shoot.ship.ShipInputRecorder'
	],
	$statics : {
		RESTART_INTERVAL : 2000
	},
	$constructor : function (engine) {
		this.$BaseObject.constructor.call(this);
		this.__engine = engine;
		this.__shipDestroyedTimestamp = -this.RESTART_INTERVAL;
		this.__points = 0;
		this.__highscore = 0;
		
	},
	
	$prototype : {
		update : function () {
			if (!this.__ship && this.__isShipCreationCooldownOver()) {
				this.__createShip();
			}
		},

		getPoints : function () {
			return this.__points;	
		},

		getHighscore : function () {
			return this.__highscore;	
		},

		getPowerupCountdown : function () {
			if (this.__ship) {
				return this.__ship.__defaultGun.getPowerupStatus();
			}
		},

		__isShipCreationCooldownOver : function () {
			return 	(this.__engine.getTotalGameTime() > this.__shipDestroyedTimestamp + this.RESTART_INTERVAL);
		},

		__createShip : function () {
			this.__ship = new this.$Ship(this.__engine, this);
			this.__ship.setInvincible();

			this.__engine.addEntity(this.__ship);

			this.on(this.__ship, "lootCollected", this.__onLootCollectedByShip);
			this.on(this.__ship, "destroyed", this.__onShipDestroyed);
		},

		__onLootCollectedByShip : function (evt) {
			this.__points += evt.loot.getValue();
			this.__updateHighscore(this.__points);
		},

		__onShipDestroyed : function () {
			this.__shipDestroyedTimestamp = this.__engine.getTotalGameTime();
			this.__ship = null;
			this.__points = 0;
		},

		__updateHighscore : function (score) {
			this.__highscore = Math.max(this.__highscore, score);
		}
	},

	$destructor : function () {
		this.$BaseObject.constructor.call(this);
	}
});