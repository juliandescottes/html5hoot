Aria.classDefinition({
	$classpath : 'games.shoot.utils.Speed',
	$extends : 'games.common.BaseObject',
	$constructor : function () {
		this.$BaseObject.constructor.call(this);
	},
	$statics : {
		getSpeedXYForLineTrajectory : function (originX, originY, endX, endY, speed) {
			var polarityX = endX >= originX ? 1 : -1;
			var polarityY = endY >= originY ? 1 : -1;

			var xDiff = Math.abs(endX - originX);
			var yDiff = Math.abs(endY - originY);
			
			if (xDiff === 0) {
				var speedX = 0;
				var speedY = speed;
			} else {
				var ratio = yDiff/xDiff;
				// speed2 = (1 + ratio2) * speedX2 
				var speedX = speed / Math.sqrt(1 + Math.pow(ratio, 2));
				var speedY = speedX * ratio;
			}

			return  {
				x : speedX * polarityX,
				y : speedY * polarityY
			}
		}
	}
});