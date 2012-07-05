Aria.classDefinition({
	$classpath : 'games.shoot.enemy.doni.DoniScript',
	$extends : 'games.common.BaseObject',
	$dependencies : [
		'games.shoot.goal.GoMove',
		'games.shoot.goal.GoWaitAndFire',
		'games.common.math.Random',
		'games.shoot.utils.Environment'
	],
	$constructor : function (doni) {
		this.$BaseObject.constructor.call(this);
		this.__doni = doni;
		var width = this.$Environment.BOARD.WIDTH;
		var height = this.$Environment.BOARD.HEIGHT;
		this.__goals = [
			new this.$GoMove(doni.getPositionEngine(), this.$Random.nextInt(width - width/5) + 40,this.$Random.nextInt(40) + height/10),
			new this.$GoWaitAndFire(3000, doni.getGun()),
			new this.$GoMove(doni.getPositionEngine(), this.$Random.nextInt(width - width/5) + 40, this.$Random.nextInt(40) + height/2),
			new this.$GoWaitAndFire(3000, doni.getGun()),
			new this.$GoMove(doni.getPositionEngine(), this.$Random.nextInt(width - width/5) + 40, height + 100)
		];

		this.__goalIndex = 0;
	},
	$prototype : {
		update : function (deltaTime) {
			var goal = this.__getCurrentGoal();
			if (goal) {
				goal.update(deltaTime);	
				if (goal.isCompleted()) {
					this.__goalIndex ++;
				}
			}
			
		},

		__getCurrentGoal : function () {
			return this.__goals[this.__goalIndex];
		}
	}
});