Aria.classDefinition({
	$classpath : 'games.shoot.enemy.vreu.VreuScript',
	$extends : 'games.common.BaseObject',
	$dependencies : [
		'games.shoot.goal.GoMoveAndFire',
		'games.common.math.Random',
		'games.shoot.utils.Environment'
	],
	$constructor : function (vreu) {
		this.$BaseObject.constructor.call(this);
		this.__vreu = vreu;
		var width = this.$Environment.BOARD.WIDTH;
		if (vreu.getPositionEngine().getX() < 0) {
			var endX = width + 50;
		} else {
			var endX = -50;
		}
		this.__goals = [
			new this.$GoMoveAndFire(
				vreu.getPositionEngine(), 
				endX, vreu.getPositionEngine().getY(), vreu.getSpeed(),
				vreu.getGun()
			),
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
			} else {
				this.__vreu.destroy();
			}
		},

		__getCurrentGoal : function () {
			return this.__goals[this.__goalIndex];
		}
	}
});