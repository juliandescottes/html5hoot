Aria.classDefinition({
	$classpath : 'games.shoot.collision.CollisionEngineImpl',
	$extends : 'games.common.BaseObject',
	$dependencies : [
		'games.common.assert.Assert',
		'games.common.collision.ColliderResolver',
		'games.common.collision.CollisionDetector',
		'games.shoot.collision.ColliderResolverImpl',
		'games.shoot.collision.CollisionDetectorImpl'
	], 
	$implements : ['games.common.collision.CollisionEngine'],
	$statics : {
		getDefaultImplementation : function () {
			var colliderResolver = new games.shoot.collision.ColliderResolverImpl();
			var collisionDetector = new games.shoot.collision.CollisionDetectorImpl(colliderResolver);
			return new games.shoot.collision.CollisionEngineImpl(collisionDetector, colliderResolver);
		}	
	},
	$constructor : function (collisionDetector, colliderResolver) {
		this.$BaseObject.constructor.call(this);
		this.__collisionDetector = this.$Assert.isInstanceOf(collisionDetector, this.$CollisionDetector);
		this.__colliderResolver = this.$Assert.isInstanceOf(colliderResolver, this.$ColliderResolver);
	},
	$prototype : {
		resolveCollisions : function (entities) {			
			var collisions = this.__collisionDetector.getCollisions(entities);

			for (var i = 0 ; i < collisions.length ; i++) {
				this.__resolveCollision(collisions[i]);
			}
		},

		__resolveCollision : function (collision) {
			var entity1 = collision[0],
				entity2 = collision[1];
			
			var collider = this.__colliderResolver.getCollider(entity1, entity2);
			if (collider) {
				collider.collide(entity1, entity2);
			}
		}
	}
});