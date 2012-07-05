Aria.classDefinition({
	$classpath : 'games.shoot.collision.collider.BulletShipCollider',
	$extends : 'games.common.BaseObject',
	$implements : ['games.common.collision.Collider'],
	$constructor : function () {
		this.$BaseObject.constructor.call(this);
	},
	$prototype : {
		collide : function (bullet, ship) {
			bullet.destroy();
			ship.destroy();
		}
	}
});