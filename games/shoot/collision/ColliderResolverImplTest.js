Aria.testDefinition({
	$classpath : 'games.shoot.collision.ColliderResolverImplTest',
	$dependencies : [
		'aria.utils.Type', 
		'games.shoot.enemy.PhysicalEnemy', 
		'games.shoot.entity.Bullet'
	],
	$prototype : {
		setup : function () {
			this.__colliderResolver = new games.shoot.collision.ColliderResolverImpl();
			
			this.__enemy = mockato.Mockato.mock('games.shoot.enemy.PhysicalEnemy');
			this.__bullet = mockato.Mockato.mock('games.shoot.entity.Bullet');
		},

		testGetColliderCanReturnBulletEnemyCollider : function () {
			mockato.Mockato.when(this.__bullet).isPlayerBullet().thenReturn(true);
			var collider = this.__colliderResolver.getCollider(this.__bullet, this.__enemy);
			this.assertTrue(aria.utils.Type.isInstanceOf(collider, 'games.shoot.collision.BulletEnemyCollider'),
				'Expected collider to be instance of BulletEnemyCollider');
		},

		testGetColliderIsSymmetrical : function () {
			mockato.Mockato.when(this.__bullet).isPlayerBullet().thenReturn(true);
			var collider = this.__colliderResolver.getCollider(this.__enemy, this.__bullet);
			this.assertTrue(aria.utils.Type.isInstanceOf(collider, 'games.shoot.collision.BulletEnemyCollider'),
				'Expected collider to be instance of BulletEnemyCollider');
		}
	}
});