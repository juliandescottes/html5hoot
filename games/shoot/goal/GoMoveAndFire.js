Aria.classDefinition({
	$classpath : 'games.shoot.goal.GoMoveAndFire',
	$extends : 'games.shoot.goal.GoMove',
	$dependencies : [
		'games.shoot.goal.GoFire',
		'games.shoot.utils.Speed'
	], $implements : ['games.common.goal.Goal'],
	$constructor : function (positionEngine, endX, endY, speed, gun, gunDelay) {
		this.$GoMove.constructor.call(this, positionEngine, endX, endY, speed);
		this.__positionEngine = positionEngine;
		this.__goFire = new this.$GoFire(gun, gunDelay || 0);
	},
	$prototype : {
		update : function (deltaTime) {
			this.__updatePolarity();

			var speed = this.$Speed.getSpeedXYForLineTrajectory(
				this.__positionEngine.getX(), this.__positionEngine.getY(),
				this.__endX, this.__positionEngine.getY(),
				this.__speed
			);

			this.__positionEngine.setX(
				this.__positionEngine.getX() + deltaTime * speed.x
			);
			this.__positionEngine.setY(
				this.__positionEngine.getY() + deltaTime * (0.05)
			);
			this.__goFire.update(deltaTime);
		},

		isCompleted : function () {
			return this.__polarityX * this.__positionEngine.getX() > this.__polarityX * this.__endX;
		}
	}
});