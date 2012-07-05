Aria.classDefinition({
	$classpath : 'games.shoot.ship.ShipMovementEngine',
	$extends : 'games.common.BaseObject',
	$dependencies : [
		'games.common.assert.Assert',
		'games.shoot.entity.engine.ConstantAccelerationEngine'
	],
	$constructor : function (maxSpeed) {
		this.$BaseObject.constructor.call(this);
		this.__accelerationEngine = new this.$ConstantAccelerationEngine(8 * maxSpeed, maxSpeed);
	},
	$prototype : {
		update : function (delta, movementInputs) {
			if (movementInputs.up && (this.__yspeed <= 0 || !movementInputs.down)) {
				this.__accelerationEngine.goUp(delta * movementInputs.up);
			} else if (movementInputs.down && (this.__yspeed >= 0 || !movementInputs.up)) {
				this.__accelerationEngine.goDown(delta * movementInputs.down);
			} else {
				this.__accelerationEngine.stopY();
			}

			if (movementInputs.left  && (this.__xspeed <= 0 || !movementInputs.right)) {
				this.__accelerationEngine.goLeft(delta * movementInputs.left);
			} else if (movementInputs.right && (this.__xspeed >= 0 || !movementInputs.left)) {
				this.__accelerationEngine.goRight(delta * movementInputs.right);
			} else {
				this.__accelerationEngine.stopX();
			}
		},

		setMaxSpeed : function (maxSpeed) {
			this.__accelerationEngine.setMaxSpeed(maxSpeed);
		},
		
		getXSpeed : function () {
			return this.__accelerationEngine.getXSpeed();
		},

		getYSpeed : function () {
			return this.__accelerationEngine.getYSpeed();
		}
	}
});