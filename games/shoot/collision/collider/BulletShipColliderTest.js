Aria.testDefinition({
	$classpath : 'games.shoot.collision.collider.BulletShipColliderTest',
	$dependencies : [
		'mockato.Mockato', 
		'games.common.entity.DestroyableEntity',
		'games.shoot.ship.Ship'
	],
	$constructor : function () {
		this.$TestCase.constructor.call(this);
		this.$BulletShipCollider = games.shoot.collision.BulletShipCollider;	
	},
	$prototype : {
		testBulletAndShipAreDestroyed : function () {
			var bullet = mockato.Mockato.mock('games.common.entity.DestroyableEntity');
			var ship = mockato.Mockato.mock('games.shoot.ship.Ship');
			var collider = new this.$BulletShipCollider();
			collider.collide(bullet, ship);

			mockato.Mockato.verify(bullet).destroy().atLeastOnce();
			mockato.Mockato.verify(ship).destroy().atLeastOnce();
		}
	}
});