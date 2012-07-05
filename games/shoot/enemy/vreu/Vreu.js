Aria.classDefinition({
	$classpath : 'games.shoot.enemy.vreu.Vreu',
	$implements : [
		'games.common.entity.PhysicalEntity', 
		'games.shoot.enemy.PhysicalEnemy'
	],
	$dependencies : [
		'games.common.hitbox.SquareHitbox', 
		'games.shoot.enemy.EnemyExplosionBuilder',
		'games.common.sprite.AnimatedSpriteBuilder',
		'games.shoot.entity.engine.PositionEngine',
		'games.shoot.enemy.vreu.VreuScript',
		'games.shoot.enemy.vreu.VreuGun',
		'games.shoot.entity.loot.coin.Coin',
		'games.shoot.utils.Environment',
		'games.shoot.enemy.EnemyTypes'
	],
	$extends : 'games.shoot.enemy.GroundEnemy',
	$statics : {
		DEFAULT_SPEED : 0.07,
		SIZE: 18,
		LOOT_QTY : 7,
		HIT_POINTS : 3,
		DEFAULT_ANGLE : -Math.PI/2
	},
	$constructor : function (engine, x, y) {
		this.$GroundEnemy.constructor.call(this);
		this.__engine = engine;
		this.__positionEngine = new this.$PositionEngine(x, y);

		this.__gun = new this.$VreuGun(this.getPositionEngine(), engine);
		this.__script = new this.$VreuScript(this);

		this.__hits = 0;

		var transform = {
			angle : this.DEFAULT_ANGLE,
			scale : {x : 1, y : 1}
		};
		if (x >= this.$Environment.BOARD.WIDTH) {
			transform.scale.x = -1;
		}
		this.__animatedSprite = this.$AnimatedSpriteBuilder.buildFromUrlAndTransform('vreuAnimated3.png', 46, 30, games.shoot.AssetManager, transform);
	},
	$prototype : {
		draw : function (context) {
			this.__animatedSprite.draw(this.__positionEngine.getX(), this.__positionEngine.getY(), context);
			this.getHitbox().draw(context);
		},

		update : function (deltaTime) {
			this.__script.update(deltaTime);
			this.__gun.update(deltaTime);
			this.__animatedSprite.update(deltaTime);
			if (this.__isOutOfBoardLimits()) {
				this.destroy();
			}
		},

		getPositionEngine : function () {
			return this.__positionEngine;
		},

		getGun : function () {
			return this.__gun;			
		},

		getSpeed : function () {
			return this.DEFAULT_SPEED;
		},

		hit : function (damages) {
			this.__hits += damages;
			if (this.__hits >= this.HIT_POINTS) {
				this.destroy();
			}
		},

		destroy : function () {
			this.$GroundEnemy.destroy.call(this);
			this.__engine.addEntity(this.$EnemyExplosionBuilder.forPosition(this.__positionEngine));
			for (var i = 0 ; i < this.LOOT_QTY ; i++) {
				this.__engine.addEntity(new this.$Coin(this.__positionEngine.getX(), this.__positionEngine.getY()));
			}
		},

		__isOutOfBoardLimits : function () {
			return  this.__positionEngine.getY() > this.$Environment.BOARD.HEIGHT + 50;	
		},

		getHitbox : function () {
			return new this.$SquareHitbox(this.__positionEngine.getX() - this.SIZE, this.__positionEngine.getY() - this.SIZE, 2 * this.SIZE, 2 * this.SIZE);
		}
	}
});