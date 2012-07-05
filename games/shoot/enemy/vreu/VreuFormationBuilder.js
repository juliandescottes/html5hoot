Aria.classDefinition({
	$classpath : 'games.shoot.enemy.vreu.VreuFormationBuilder',
	$extends : 'games.common.BaseObject',
	$implements : ['games.shoot.enemy.EnemyFormationBuilder'],
	$dependencies : [
		'games.shoot.enemy.vreu.Vreu',
		'games.shoot.utils.Environment',
		'games.common.math.Random'
	],
	$statics : {
		COUNT : 3,
		INTERVAL : 60
	},
	$constructor : function (engine) {
		this.$BaseObject.constructor.call(this);
		this.__engine = engine;
		this.__yPos = this.$Random.nextInt(this.$Environment.BOARD.HEIGHT - 400) + 100;
		if (this.$Random.nextBoolean()) {
			this.__start = -(this.COUNT * this.INTERVAL);
		} else {
			this.__start = this.$Environment.BOARD.WIDTH + 60;
		}
	},
	$prototype : {
		build : function () {
			for (var i = 0 ; i < this.COUNT ; i++) {
					this.__addEnemyAtX(this.__start + this.INTERVAL * i);
			}
		},

		__addEnemyAtX : function (xPos) {
			var enemy = new this.$Vreu(this.__engine, xPos, this.__yPos + this.$Random.nextInt(20));
			this.__engine.addEntity(enemy);
		}
	}
})