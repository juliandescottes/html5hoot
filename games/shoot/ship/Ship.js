Aria.classDefinition({
	$classpath : 'games.shoot.ship.Ship',
	$implements : ['games.common.entity.PhysicalEntity'],
	$dependencies : [
		'aria.utils.Math',
		'games.common.utils.UserAgent',
		'games.common.hitbox.SquareHitbox',
		'games.common.sprite.AnimatedSpriteBuilder',
		'games.common.sprite.Sprite',
		'games.shoot.entity.loot.powerup.Power',
		'games.shoot.ship.BeamGun',
		'games.shoot.ship.CollectedPoints',
		'games.shoot.ship.DefaultShipGun',
		'games.shoot.ship.Magnet',
		'games.shoot.ship.ShipExplosionBuilder',
		'games.shoot.ship.ShipMovementEngine',
		'games.shoot.ship.ShipPilot',
		'games.shoot.ship.TouchShipPilot',
		'games.shoot.utils.Environment',
		'games.shoot.utils.GameType'
	],
	$extends : 'games.common.entity.DestroyableEntity',
	$statics : {
		DEFAULT_BULLET_INTERVAL : 60,
		BEAM_DELAY : 300,
		DEFAULT_SPEED : 0.3,
		BEAMING_SPEED : 0.15,
		HITBOX_SIZE : 10
	},
	$events : {
		'lootCollected' : 'Fired when the ship collected a loot',
		'destroyed' : 'Notify listeners of entity destruction'
	},
	$constructor : function (engine) {
		this.$DestroyableEntity.constructor.call(this);
		
		this.__engine = engine;

		if (this.$UserAgent.isTouchDevice()) {
			this.__shipPilot = new this.$TouchShipPilot(this);
		} else {
			this.__shipPilot = new this.$ShipPilot(this);	
		}

		this.__x = (this.$Environment.BOARD.WIDTH/2) - this.HITBOX_SIZE;
		this.__y = this.$Environment.BOARD.HEIGHT - (2 * this.HITBOX_SIZE);

		this.__firingTime = 0;

		this.__movementEngine = new this.$ShipMovementEngine(this.DEFAULT_SPEED);
		this.__defaultGun = new this.$DefaultShipGun(this.__engine, this.DEFAULT_BULLET_INTERVAL);
		this.__beamGun = new this.$BeamGun(this.__engine, this.BEAMING_SPEED);

		this.__magnet = new this.$Magnet(this.HITBOX_SIZE * 10);
		this.__engine.addEntity(this.__magnet);
		
		this.__spriteRegular = this.$Sprite.buildForSpriteUrl('shipBis.png', -Math.PI/2, games.shoot.AssetManager);
		this.__spriteLeft = this.$Sprite.buildForSpriteUrl('shipLeftBis.png', -Math.PI/2, games.shoot.AssetManager);
		this.__spriteRight = this.$Sprite.buildForSpriteUrl('shipRightBis.png', -Math.PI/2, games.shoot.AssetManager);

		this.__invincibilityShieldSprite = this.$AnimatedSpriteBuilder.buildFromFramesheetUrlAndRotate('invincibilityShieldAnimated.png', 30, 120, games.shoot.AssetManager, 0);

		this.__gun = this.__defaultGun;
	},
	$prototype : {
		update : function (deltaTime) {
			this.__shipPilot.update(deltaTime);
			this.__updatePosition(deltaTime);
			if (this.__invincible) {
				this.__updateInvincibility(deltaTime);
			}
			
			this.__updateMagnet();
			
			this.__defaultGun.update(deltaTime);
		},

		__getCurrentSprite : function () {
			if (this.__movementEngine.getXSpeed() > 0) {
				return this.__spriteRight;
			} else if (this.__movementEngine.getXSpeed() < 0) {
				return this.__spriteLeft;
			} else {
				return this.__spriteRegular;
			}
		},

		draw : function (context) {
			this.__getCurrentSprite().draw(this.__x, this.__y, context, 1);
			if (this.__invincible) {
				this.__invincibilityShieldSprite.draw(this.__x, this.__y, context, 1.5);
			}
			this.getHitbox().draw(context);
		},

		destroy : function () {
			if (!this.__invincible) {
				this.$DestroyableEntity.destroy.call(this);
				this.__engine.addEntity(this.$ShipExplosionBuilder.forXY(this.__x, this.__y));
				this.__beamGun.destroy();
				for (var i = 0 ; i < this.__defaultGun.getBulletCount() ; i++) {
					this.__engine.addEntity(new this.$Power(this.__x, this.__y, 0.6));
				}
				this.__defaultGun.destroy();
				this.__magnet.destroy();

				this.$raiseEvent({name:"destroyed"});
			}			
		},

		getHitbox : function () {
			var size = this.HITBOX_SIZE;
			if (this.__invincible) {
				size = size * 3;
			}
			return new this.$SquareHitbox(this.__x - size/2, this.__y - size/2, size, size);
		},

		getX : function () {
			return this.__x;
		},

		getY : function () {
			return this.__y;		
		},

		setInvincible : function () {
			this.__invincible = true;
			this.__invincibleStartTime = this.__getTotalGameTime();
		},

		collect : function (loot) {
			if (this.$GameType.isPowerUp(loot)) {
				this.__defaultGun.powerup()
				this.__engine.addEntity(new this.$CollectedPoints(this.__x, this.__y, loot.getValue()));
			}
			this.__engine.addEntity(new this.$CollectedPoints(this.__x, this.__y, loot.getValue()));
			this.$raiseEvent({name:"lootCollected",loot:loot});
		},

		fire : function (deltaTime) {
			this.__firingTime += deltaTime;
			if (this.__firingTime > this.BEAM_DELAY) {
				this.__gun = this.__beamGun;		
			} 

			this.__gun.fire(this.__x, this.__y - 25, deltaTime);
		},

		haltFire : function () {
			this.__firingTime = 0;
			this.__gun.halt();
			this.__gun = this.__defaultGun;
		},

		move : function (deltaTime, movementConfiguration) {
			if (this.__isUsingBeamGun()) {
				this.__movementEngine.setMaxSpeed(this.BEAMING_SPEED);
			} else {
				this.__movementEngine.setMaxSpeed(this.DEFAULT_SPEED);
			}
			this.__movementEngine.update(deltaTime, movementConfiguration);
		},

		__getTotalGameTime : function () {
			return this.__engine.getTimer().getTotalGameTime();
		},

		__updateInvincibility : function (deltaTime) {
			this.__invincibilityShieldSprite.update(deltaTime);

			if (this.__getTotalGameTime() - this.__invincibleStartTime  > 1500) {
				this.__invincibilityShieldSprite.__frameDuration = 30;	
			} else {
				this.__invincibilityShieldSprite.__frameDuration = 90;	
			}
			if (this.__getTotalGameTime() - this.__invincibleStartTime  > 2000) {
				this.__invincible = false;		
			}
		},

		__updatePosition : function (deltaTime) {
			var newX = this.__x + deltaTime * this.__movementEngine.getXSpeed();
			this.__x = this.$Math.normalize(newX, 10, this.$Environment.BOARD.WIDTH - 10);
			var newY = this.__y + deltaTime * this.__movementEngine.getYSpeed();
			this.__y = this.$Math.normalize(newY, 10, this.$Environment.BOARD.HEIGHT - 10);
		},

		__updateMagnet : function () {
			this.__magnet.setXY(this.__x, this.__y);
		},

		__isUsingBeamGun : function () {
			return this.__gun == this.__beamGun; 
		},

		__hasInput : function (code) {
			return this.__inputRecorder.getInputByCode(code);
		}
	}
});