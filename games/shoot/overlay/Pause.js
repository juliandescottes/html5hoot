Aria.classDefinition({
	$classpath : 'games.shoot.overlay.Pause',
	$extends : 'games.common.entity.DestroyableEntity',
	$dependencies : [
		'games.shoot.utils.Environment',
		'games.common.text.Text'
	], 
	$implements : ['games.shoot.overlay.OverlayEntity'],
	$statics : {
		BLINKING_INTERVAL : 600
	},
	$constructor : function () {
		this.$DestroyableEntity.constructor.call(this);
		this.__text = new this.$Text('Game', '24pt', 'white', 'center', 'middle');
		this.__text.setContent('Pause');
		this.__elapsedTime = 0;
	},
	$prototype : {
		update : function (deltaTime) {
			// make text blink somehow
			this.__elapsedTime += deltaTime;
		},

		draw : function (context) {
			context.beginPath();
			context.fillStyle = "rgba(0, 0, 0, 0.5)";  
 			context.fillRect (0, 0, this.$Environment.BOARD.WIDTH, this.$Environment.BOARD.HEIGHT);
 			context.stroke();
			context.closePath();
			if (this.__elapsedTime % (this.BLINKING_INTERVAL*2) < this.BLINKING_INTERVAL) {
				this.__text.draw(this.$Environment.BOARD.WIDTH/2, this.$Environment.BOARD.HEIGHT/2, context);
			}			
		},

		destroy : function () {
			this.__text.destroy();
			this.$DestroyableEntity.destroy.call(this);
		}
	}
});