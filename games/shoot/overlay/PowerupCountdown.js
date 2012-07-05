Aria.classDefinition({
	$classpath : 'games.shoot.overlay.PowerupCountdown',
	$implements : ['games.shoot.overlay.OverlayEntity'],
	$extends : 'games.common.BaseObject',
	$dependencies : [
		'games.shoot.utils.Environment',
		'games.common.text.Text'
	],
	$statics : {
		FONT_SIZE : '12pt',
		FONT_COLOR : '#adf',
		FONT_FAMILY : 'Game'
	},
	$constructor : function () {
		this.$BaseObject.constructor.call(this);
		this.bullets = new this.$Text(this.FONT_FAMILY, this.FONT_SIZE, this.FONT_COLOR, 'left');
		this.charge = new this.$Text(this.FONT_FAMILY, this.FONT_SIZE, this.FONT_COLOR, 'left');
	},
	$prototype : {
		setContent : function (status) {
			if (status) {
				this.bullets.setContent("Bullets : " + status.count);

				var charge = Math.ceil((status.totalTime - status.time) / status.totalTime * 100);
				this.charge.setContent("Charge : " + charge);

			} else {
				this.bullets.setContent("");
				this.charge.setContent("");
			}
		},
		update : function (deltaTime) {
			this.bullets.update(deltaTime);
			this.charge.update(deltaTime);
		},
		isDestroyed : function () {
			return this.bullets.isDestroyed() && this.charge.isDestroyed();
		},
		destroy : function () {
			this.bullets.destroy() && this.charge.destroy();
		},
		draw : function (context) {
			this.bullets.draw(
				25, 
				20,
				context
			);
			this.charge.draw(
				25, 
				50,
				context
			);
		}
	}
});