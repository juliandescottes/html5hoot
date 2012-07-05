Aria.classDefinition({
	$classpath : 'games.common.entity.Square',
	$extends : 'games.common.BaseObject',
	$dependencies : [], $implements : ['games.common.entity.Entity'],
	$constructor : function () {
		this.$BaseObject.constructor.call(this);
	},
	$prototype : {
		update : function () {},
		destroy : function () {},
		isDestroyed : function () {},
		draw : function (color, context) {
			context.strokeStyle = color;

			context.beginPath();
			context.moveTo(this.x, this.y); 

			context.lineTo(this.x , this.y + this.height);
			context.lineTo(this.x + this.width, this.y + this.height);
			context.lineTo(this.x + this.width, this.y);
			context.lineTo(this.x, this.y); 

			context.stroke();
			context.closePath();
		},
	}
});