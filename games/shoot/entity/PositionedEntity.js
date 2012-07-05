Aria.classDefinition({
	$classpath : 'games.shoot.entity.PositionedEntity',
	$extends : 'games.common.entity.DestroyableEntity',
	$constructor : function (x, y) {
		this.$DestroyableEntity.constructor.call(this);
		this.__x = x;
		this.__y = y;
	},
	$prototype : {
		getX : function () {
			return this.__x;
		},

		getY : function () {
			return this.__y;
		}
	}
});