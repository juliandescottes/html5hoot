Aria.classDefinition({
	$classpath : 'games.shoot.enemy.doni.DoniScript',
	$extends : 'games.common.BaseObject',
	$dependencies : [
		'games.shoot.goal.GoMove',
		'games.common.math.Random'
	],
	$constructor : function (positionEngine) {
		this.$BaseObject.constructor.call(this);
		this.__doni = doni;
		this.__goals = [
			new this.$GoMove(positionEngine, positionEngine.getX() + 20, positionEngine.getY(), 1),
			new this.$GoMove(positionEngine, null, 600, 0.05),
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
})