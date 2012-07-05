Aria.classDefinition({
	$classpath : 'games.common.entity.DestroyableEntity',
	$implements : ['games.common.entity.Entity'],
	$extends : 'games.common.BaseObject',
	$constructor : function () {
		this.$BaseObject.constructor.call(this);
		this.__isDestroyed = false;
	},
	$prototype : {
		update : function () {},
		draw : function () {},

		isDestroyed : function () {
			return this.__isDestroyed;
		},

		destroy : function () {
			this.__isDestroyed = true; 	
		}
	}
});