Aria.classDefinition({
	$classpath : 'games.shoot.ship.CollectedPoints',
	$extends : 'games.common.text.Text',
	$implements : ['games.shoot.overlay.OverlayEntity'],
	$statics : {
		FONT_SIZE : '12pt',
		RGB : '170,170,255',
		FONT_FAMILY : 'Game',
		SPEED : 0.05,
		DIST_Y : 50
	},
	$constructor : function (x, y, points) {
		this.$Text.constructor.call(this, this.FONT_FAMILY, this.FONT_SIZE, this.getColorForAlpha(1), 'center');
		this.setContent("+" + points);
		this.__x = x;
		this.__y = y - 30;
		this.__minY = this.__y - this.DIST_Y;
		this.__speed = this.SPEED;
	},
	$prototype : {
		update : function (deltaTime) {
			this.__y -= this.__speed * deltaTime;
			var remainingDistance = this.__y - this.__minY;
			if (remainingDistance > 0) {
				var alpha = remainingDistance/this.DIST_Y;
				this.setColor(this.getColorForAlpha(alpha));
			} else {
				this.destroy();				
			}
		},

		draw : function (context) {
			this.$Text.draw.call(this,
				this.__x, 
				this.__y,
				context
			);
		},

		getColorForAlpha : function (alpha) {
			alpha = Math.max(0, alpha);
			return 'rgba('+ this.RGB +',' + alpha +')';
		}
	}
});