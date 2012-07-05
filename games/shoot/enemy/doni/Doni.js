Aria.classDefinition({
	$classpath : 'games.shoot.enemy.doni.Doni',
	$implements : [
		'games.common.entity.PhysicalEntity', 
		'games.shoot.enemy.PhysicalEnemy'
	],
	$dependencies : [
		'games.common.hitbox.SquareHitbox', 
		'games.shoot.enemy.EnemyBullet',
		'games.shoot.enemy.EnemyExplosionBuilder',
		'games.common.sprite.Sprite',
		'games.shoot.entity.engine.PositionEngine',
		'games.shoot.enemy.doni.DoniScript',
		'games.shoot.enemy.doni.DoniGun',
		'games.shoot.entity.loot.coin.Coin',
		'games.shoot.entity.loot.powerup.Power',
		'games.shoot.utils.Environment',
		'games.shoot.enemy.EnemyTypes',
		'games.common.math.Random'
	],
	$extends : 'games.shoot.enemy.AirEnemy',
	$statics : {
		DEFAULT_SPEED : 0.1,
		BULLET_INTERVAL : 1000,
		SIZE: 10,
		LOOT_QTY : 10,
		HIT_POINTS : 1
	},
	$constructor : function (engine, x, y) {
		this.$AirEnemy.constructor.call(this);
		this.__engine = engine;
		this.__positionEngine = new this.$PositionEngine(x, y);
		this.__gun = new this.$DoniGun(this.getPositionEngine(), engine);
		this.__hits = 0;
		this.__script = new this.$DoniScript(this);

		this.__sprite = this.$Sprite.buildForSpriteUrl('enemy.png', Math.PI/2, games.shoot.AssetManager);
	},
	$prototype : {
		draw : function (context) {
			this.__sprite.draw(this.__positionEngine.getX(), this.__positionEngine.getY(), context);
			this.getHitbox().draw(context);
		},

		update : function (deltaTime) {
			this.__script.update(deltaTime);
			this.__gun.update(deltaTime);
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

		hit : function (damages) {
			this.__hits += damages;
			if (this.__hits >= this.HIT_POINTS) {
				this.destroy();
			}
		},

		destroy : function () {
			this.$AirEnemy.destroy.call(this);
			this.__engine.addEntity(this.$EnemyExplosionBuilder.forPosition(this.__positionEngine));
			for (var i = 0 ; i < this.LOOT_QTY ; i++) {
				this.__engine.addEntity(new this.$Coin(this.__positionEngine.getX(), this.__positionEngine.getY()));
			}
			if (true || this.$Random.nextInt(10) === 0) {
				this.__engine.addEntity(new this.$Power(this.__positionEngine.getX(), this.__positionEngine.getY()));	
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