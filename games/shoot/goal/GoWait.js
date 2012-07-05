Aria.classDefinition({
	$classpath : 'games.shoot.goal.GoWait',
	$extends : 'games.common.BaseObject',
	$dependencies : [], 
	$implements : ['games.common.goal.Goal'],
	$constructor : function (waitingTime) {
		this.$BaseObject.constructor.call(this);
		this.__waitedFor = 0;
		this.__waitingTime = waitingTime;
	},
	$prototype : {
		update : function (deltaTime) {
			this.__waitedFor += deltaTime;
		},

		isCompleted : function () {
			return this.__waitedFor >= this.__waitingTime;
		}
	}
});
