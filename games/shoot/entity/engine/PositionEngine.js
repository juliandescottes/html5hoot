Aria.classDefinition({
	$classpath : 'games.shoot.entity.engine.PositionEngine',
	$extends : 'games.common.BaseObject',
	$constructor : function (x, y) {
		this.$BaseObject.constructor.call(this);
		this.__x = x;
		this.__y = y;
	},
	$prototype : {
		getX : function () {
			return this.__x;
		},

		getY : function () {
			return this.__y;
		},

		setX : function (x) {
			this.__x = x;
		},

		setY : function (y) {
			this.__y = y;
		}
	}
})