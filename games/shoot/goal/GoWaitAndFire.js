Aria.classDefinition({
	$classpath : 'games.shoot.goal.GoWaitAndFire',
	$extends : 'games.common.BaseObject',
	$dependencies : [
		'games.shoot.goal.GoWait',
		'games.shoot.goal.GoFire'
	], $implements : ['games.common.goal.Goal'],
	$constructor : function (waitingTime, gun, gunDelay) {
		this.$BaseObject.constructor.call(this);
		this.__goWait = new this.$GoWait(waitingTime);
		this.__goFire = new this.$GoFire(gun, gunDelay || 0);
	},
	$prototype : {
		update : function (deltaTime) {
			this.__goWait.update(deltaTime);
			this.__goFire.update(deltaTime);
		},

		isCompleted : function () {
			return this.__goWait.isCompleted();
		}
	}
});