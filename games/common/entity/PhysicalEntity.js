Aria.interfaceDefinition({
	$classpath : 'games.common.entity.PhysicalEntity',
	$extends : 'games.common.entity.Entity',
	$interface : {
		/**
		 * Returns an instance of hitbox.Hitbox, describing the physical space taken by this entity
		 */
		getHitbox : function () {}
	}
});