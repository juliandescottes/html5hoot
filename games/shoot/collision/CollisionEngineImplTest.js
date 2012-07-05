Aria.testDefinition({
	$classpath : 'games.shoot.collision.CollisionEngineImplTest',
	$dependencies : [
		'mockato.Mockato', 
		'mockato.Matchers', 
		'games.common.collision.CollisionDetector', 
		'games.common.collision.ColliderResolver',
		'games.common.collision.Collider',
		'games.common.entity.Entity'
	],
	$prototype : {
		setup : function () {
			this.__collisionDetector = mockato.Mockato.mock('games.common.collision.CollisionDetector');
			this.__colliderResolver = mockato.Mockato.mock('games.common.collision.ColliderResolver');
			this.__defaultCollider = mockato.Mockato.mock('games.common.collision.Collider');
			this.__entities = [
				mockato.Mockato.mock('games.common.entity.Entity'),
				mockato.Mockato.mock('games.common.entity.Entity'),
				mockato.Mockato.mock('games.common.entity.Entity'),
			];
			mockato.Mockato.
				when(this.__colliderResolver).getCollider(mockato.Matchers.ANY, mockato.Matchers.ANY).
				thenReturn(this.__defaultCollider);

			this.__engine = new games.shoot.collision.CollisionEngineImpl(
				this.__collisionDetector, 
				this.__colliderResolver
			);
		},
		testCannotCreateEngineWithInvalidParameters : function () {
			this.__assertCannotInstanciateWithParameters();
			this.__assertCannotInstanciateWithParameters(this.__collisionDetector, null);
			this.__assertCannotInstanciateWithParameters(null, this.__colliderResolver);
			this.__assertCannotInstanciateWithParameters(this.__colliderResolver, this.__collisionDetector);			
		},

		testColliderIsNotCalledIfThereAreNoCollisions : function () {
 			mockato.Mockato.when(this.__collisionDetector).getCollisions(mockato.Matchers.ANY).thenReturn([]);	
			this.__engine.resolveCollisions(this.__entities);

			mockato.Mockato.verify(this.__defaultCollider).collide(mockato.Matchers.ANY, mockato.Matchers.ANY).wasNeverCalled();
		},
		testColliderWasCalled : function () {
			var collision = [
				mockato.Mockato.mock('games.common.entity.Entity'), 
				mockato.Mockato.mock('games.common.entity.Entity')
			];
 			mockato.Mockato.when(this.__collisionDetector).getCollisions(mockato.Matchers.ANY).thenReturn([collision]);
			this.__engine.resolveCollisions(this.__entities);
			
			mockato.Mockato.verify(this.__defaultCollider).collide(mockato.Matchers.ANY, mockato.Matchers.ANY).wasCalled();
		},

		__assertCannotInstanciateWithParameters : function (collisionDetector, collisionResolver) {
			var hasFailed = false;
			try {
				new games.shoot.collision.CollisionEngineImpl(collisionDetector, collisionResolver);
			} catch (expected) {
				hasFailed = true;
			}		
			this.assertTrue(hasFailed);
		}
	}
});