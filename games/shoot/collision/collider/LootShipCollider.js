Aria.classDefinition({
	$classpath : 'games.shoot.collision.collider.LootShipCollider',
	$extends : 'games.common.BaseObject',
	$constructor : function () {
		this.$BaseObject.constructor.call(this);
	},
	$prototype : {
		collide : function (loot, ship) {
			if (ship.$Ship) {
				ship.collect(loot);
				loot.destroy();
			} else {
				return this.collide(ship, loot);
			}
		}		
	}
});