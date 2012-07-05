Aria.testDefinition({
	$classpath : 'games.shoot.collision.collider.BulletEnemyColliderTest',
	$dependencies : [
		'mockato.Mockato', 'mockato.Matchers', 
		'games.common.entity.DestroyableEntity', 
		'games.shoot.enemy.PhysicalEnemy'
	],
	$constructor : function () {
		this.$TestCase.constructor.call(this);
		this.$BulletEnemyCollider = games.shoot.collision.BulletEnemyCollider;	
	},
	$prototype : {
		testBulletAndEnemyAreDestroyed : function () {
			var bullet = mockato.Mockato.mock('games.common.entity.DestroyableEntity');
			var enemy = mockato.Mockato.mock('games.shoot.enemy.PhysicalEnemy');
			var collider = new this.$BulletEnemyCollider();
			
			collider.collide(bullet, enemy);

			mockato.Mockato.verify(bullet).destroy().atLeastOnce();
			mockato.Mockato.verify(enemy).hit(mockato.Matchers.ANY).atLeastOnce();
		}
	}
});