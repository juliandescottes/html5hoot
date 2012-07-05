Aria.classDefinition({
	$classpath : 'games.shoot.entity.DefaultForceSensitiveEntity',
	$extends : 'games.shoot.entity.PositionedEntity',
	$constructor : function (x, y) {
		this.$PositionedEntity.constructor.call(this, x, y);
	},
	$prototype : {
		addForce : function () {

		},

		removeForce : function () {
			
		}
	}
});