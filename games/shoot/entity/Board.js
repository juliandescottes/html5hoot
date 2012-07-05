Aria.classDefinition({
	$classpath : 'games.shoot.entity.Board',
	$implements : ['games.common.entity.Entity'],
	$statics : {
		LINE_INTERVAL : 30,
		DEFAULT_SPEED : 0.05
	},
	$constructor : function () {
		this.__firstHorizontalLinePosition = 0;
	},
	$prototype : {
		update : function (time) {
			var positionDelta = this.DEFAULT_SPEED * time;
			this.__firstHorizontalLinePosition = (this.__firstHorizontalLinePosition + positionDelta) % this.LINE_INTERVAL;
		},
		draw : function(context) {
			context.strokeStyle = '#bbb';

			var linePosition = this.__firstHorizontalLinePosition; 
			while(linePosition < 500) {
				this.__drawHorizontalLine(context, linePosition);
				linePosition += this.LINE_INTERVAL;
			}

			var linePosition = 0; 
			while(linePosition < 500) {
				this.__drawVerticalLine(context, linePosition);
				linePosition += this.LINE_INTERVAL;
			}
		},

		__drawHorizontalLine : function (context, linePosition) {
			context.beginPath();
			context.moveTo(0, linePosition); 
			context.lineTo(600, linePosition);
			context.stroke();
			context.closePath();
		},

		__drawVerticalLine : function (context, linePosition) {
			context.beginPath();
			context.moveTo(linePosition, 0); 
			context.lineTo(linePosition, 600);
			context.stroke();
			context.closePath();
		},

		destroy : function () {},
		isDestroyed : function () {
			return false;
		}
	}
});