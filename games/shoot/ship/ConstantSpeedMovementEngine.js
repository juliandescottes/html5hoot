Aria.classDefinition({
	$classpath : 'games.shoot.ship.ConstantSpeedMovementEngine',
	$extends : 'games.common.BaseObject',
	$dependencies : ['games.common.assert.Assert'],
	$constructor : function (recorder, maxSpeed) {
		this.$BaseObject.constructor.call(this);
		this.__recorder = this.$Assert.isInstanceOf(recorder, 'games.common.input.InputRecorder');
		this.__maxSpeed = maxSpeed;
	},
	$prototype : {
		update : function (delta) {
			if (this.__hasInput("up")) {
				this.__goUp();
			} else if (this.__hasInput("down")) {
				this.__goDown();
			} else {
				this.__yspeed = 0;
			}

			if (this.__hasInput("left")) {
				this.__goLeft();
			} else if (this.__hasInput("right")) {
				this.__goRight();
			} else {
				this.__xspeed = 0;
			}
		},

		setMaxSpeed : function (maxSpeed) {
			this.__maxSpeed = maxSpeed;
		},
		
		getXSpeed : function () {
			return this.__xspeed;
		},

		getYSpeed : function () {
			return this.__yspeed;
		},

		__hasInput : function (code) {
			return !!this.__recorder.getInputByCode(code);
		},

		__goRight : function () {
			this.__xspeed = this.__maxSpeed;
		},

		__goLeft : function () {
			this.__xspeed = -1 * this.__maxSpeed;
		},

		__goUp : function () {
			this.__yspeed = -1 * this.__maxSpeed;
		},

		__goDown : function () {
			this.__yspeed = this.__maxSpeed;
		}
	}
});