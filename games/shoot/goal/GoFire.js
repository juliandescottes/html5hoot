Aria.classDefinition({
	$classpath : 'games.shoot.goal.GoFire',
	$extends : 'games.common.BaseObject',
	$dependencies : [], $implements : ['games.common.goal.Goal'],
	$constructor : function (gun, delay) {
		this.$BaseObject.constructor.call(this);
		this.__gun = gun;
		this.__delay = delay || 0;
		this.__timeLastFire = 0;
	},
	$prototype : {
		update : function (deltaTime) {
			this.__timeLastFire += deltaTime;
			if (this.__timeLastFire > this.__delay) {
				this.__timeLastFire = 0;
				this.__gun.fire();	
			}			
		},

		isCompleted : function () {
			return false;
		}
	}
});