Aria.testDefinition({
	$classpath : 'games.shoot.collision.CollisionDetectorImplTest',
	$dependencies : [
		'mockato.Mockato',
		'mockato.Matchers',
		'games.common.hitbox.Hitbox', 
		'games.common.entity.Entity',
		'games.common.entity.PhysicalEntity',
		'games.common.collision.ColliderResolver',
		'games.common.collision.Collider',
		'games.shoot.collision.CollisionBucketBuilder'
	],
	$prototype : {
		setup : function () {
			this.__physicalEntity1 = mockato.Mockato.mock('games.common.entity.PhysicalEntity'); 
			this.__physicalEntity2 = mockato.Mockato.mock('games.common.entity.PhysicalEntity'); 
			this.__otherEntity = mockato.Mockato.mock('games.common.entity.Entity'); 

			this.__bucketBuilder = mockato.Mockato.mock('games.shoot.collision.CollisionBucketBuilder');
			
			var hitbox1 = mockato.Mockato.mock('games.common.hitbox.Hitbox');
			var hitbox2 = mockato.Mockato.mock('games.common.hitbox.Hitbox');

			mockato.Mockato.when(this.__physicalEntity1).getHitbox().thenReturn(hitbox1);	
			mockato.Mockato.when(this.__physicalEntity2).getHitbox().thenReturn(hitbox2);
				
			mockato.Mockato.when(hitbox1).intersects(hitbox2).thenReturn(true);
			mockato.Mockato.when(hitbox2).intersects(hitbox1).thenReturn(true);

			var colliderResolver = mockato.Mockato.mock('games.common.collision.ColliderResolver');
			var ANY = mockato.Matchers.ANY;
			mockato.Mockato.when(colliderResolver).getCollider(ANY, ANY).thenReturn(mockato.Mockato.mock('games.common.collision.Collider'));
			this.__collistionDetector = new games.shoot.collision.CollisionDetectorImpl(colliderResolver, this.__bucketBuilder);
		},

		testCollisionForConflictingHitboxesIsDetected : function () {
			var entities = [this.__physicalEntity1, this.__physicalEntity2];
			this.__mockBucketBuilderForEntities(entities, [entities]);
			var collisions = this.__collistionDetector.getCollisions(entities);
					
			this.assertTrue(collisions.length == 1);
		},

		testCollisionDetectorCanDealWithNonPhysicalEntities : function () {
			var entities = [this.__physicalEntity1, this.__otherEntity];
			this.__mockBucketBuilderForEntities(entities, [[]]);
			var collisions = this.__collistionDetector.getCollisions(entities);
					
			this.assertTrue(collisions.length == 0);
		},

		__mockBucketBuilderForEntities : function (entities, returnedBuckets) {
			var ANY = mockato.Matchers.ANY;
			mockato.Mockato.when(this.__bucketBuilder).build(entities, ANY, ANY, ANY).thenReturn(returnedBuckets);
		}
	}
});