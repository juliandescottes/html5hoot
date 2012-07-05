Aria.classDefinition({
	$classpath : 'games.shoot.entity.engine.ConstantAccelerationEngine',
	$extends : 'games.common.BaseObject',
	$dependencies : [], $implements : [],
	$constructor : function (acceleration, maxSpeed) {
		this.$BaseObject.constructor.call(this);
		this.__acceleration = acceleration;
		this.__maxSpeed = maxSpeed;
		this.__xspeed = 0;
		this.__yspeed = 0;
	},
	$prototype : {
		setMaxSpeed : function (maxSpeed) {
			this.__maxSpeed = maxSpeed;
		},
		
		getXSpeed : function () {
			return this.__xspeed;
		},

		getYSpeed : function () {
			return this.__yspeed;
		},

		goRight : function (delta) {
			this.__xspeed = Math.max(this.__xspeed, 0);
			this.__xspeed = Math.min(this.__xspeed + this.__acceleration * (delta/1000) , this.__maxSpeed);
		},

		goLeft : function (delta) {
			this.__xspeed = Math.min(this.__xspeed, 0);
			this.__xspeed = Math.max(this.__xspeed - this.__acceleration * (delta/1000) , -1 * this.__maxSpeed);
		},

		goUp : function (delta) {
			this.__yspeed = Math.min(this.__yspeed, 0);
			this.__yspeed = Math.max(this.__yspeed - this.__acceleration * (delta/1000) , -1 * this.__maxSpeed);
		},

		goDown : function (delta) {
			this.__yspeed = Math.max(this.__yspeed, 0);
			this.__yspeed = Math.min(this.__yspeed + this.__acceleration * (delta/1000) , this.__maxSpeed);
		},

		stopY : function () {
			this.__yspeed = 0;
		},

		stopX : function () {
			this.__xspeed = 0;
		}
	}
});