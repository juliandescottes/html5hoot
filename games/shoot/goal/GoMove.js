Aria.classDefinition({
	$classpath : 'games.shoot.goal.GoMove',
	$implements : ['games.common.goal.Goal'],
	$dependencies : ['games.shoot.utils.Speed'],
	$extends : 'games.common.BaseObject',
	$statics : {
		SPEED : 0.2	
	},
	$constructor : function (positionEngine, endX, endY, speed) {
		this.$BaseObject.constructor.call(this);
		this.__positionEngine = positionEngine;
		this.__endX = endX;
		this.__endY = endY;

		this.__speed = speed || this.SPEED;
	},
	$prototype : {
		update : function (deltaTime) {
			this.__updatePolarity();

			var speed = this.$Speed.getSpeedXYForLineTrajectory(
				this.__positionEngine.getX(), this.__positionEngine.getY(),
				this.__endX, this.__endY,
				this.__speed
			);

			this.__positionEngine.setX(
				this.__positionEngine.getX() + deltaTime * speed.x
			);
			this.__positionEngine.setY(
				this.__positionEngine.getY() + deltaTime * speed.y
			);
		},

		isCompleted : function () {
			return (this.__polarityX * this.__positionEngine.getX() > this.__polarityX * this.__endX || this.__polarityY * this.__positionEngine.getY() > this.__polarityY * this.__endY);
		},

		setSpeed : function (speed) {
			this.__speed = speed;
		},

		__updatePolarity : function () {
			this.__polarityX = this.__endX >= this.__positionEngine.getX() ? 1 : -1;
			this.__polarityY = this.__endY >= this.__positionEngine.getY() ? 1 : -1;
		}
	}
});