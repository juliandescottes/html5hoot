Aria.classDefinition({
	$classpath : 'games.shoot.collision.CollisionDetectorImpl',
	$extends : 'games.common.BaseObject',
	$dependencies : [
		'games.common.assert.Assert', 
		'aria.utils.Type',
		'games.shoot.utils.Environment',
		'games.shoot.collision.CollisionBucketBuilder'
	], 
	$implements : ['games.common.collision.CollisionDetector'],
	$statics : {
		BUCKETS : 6
	},
	$constructor : function (colliderResolver, collisionBucketBuilder) {
		this.$BaseObject.constructor.call(this);
		this.__colliderResolver = colliderResolver;
		this.__collisionBucketBuilder = collisionBucketBuilder || new this.$CollisionBucketBuilder();
	},
	$prototype : {
		getCollisions : function (entities) {
			var collisions = [];
			var collisionBuckets = this.__createPhysicalEntitiesBuckets(entities);
			for (var i = 0 ; i < collisionBuckets.length ; i++) {
				collisions = collisions.concat(this.__getCollisionsInBucket(collisionBuckets[i]));
			}
			return collisions;
		},

		__getCollisionsInBucket : function (entities) {
			var collisions = [];
			for (var i = 0 ; i < entities.length ; i++) {
				var entity = entities[i];
				for (var j = i + 1 ; j < entities.length ; j++) {
					var otherEntity = entities[j];
					if (this.__areEntitiesColliding(entity, otherEntity)) {
						collisions.push([entity, otherEntity]);
					}
				}
			}
			return collisions;
		},

		__createPhysicalEntitiesBuckets : function (entities) {
			var height = this.$Environment.BOARD.HEIGHT;
			var width = this.$Environment.BOARD.WIDTH;
			return this.__collisionBucketBuilder.build(entities, this.BUCKETS, width, height);
		},

		__areEntitiesColliding : function (entity1, entity2) {
			if (this.__colliderResolver.getCollider(entity1, entity2)) {
				// TODO :  never talk to strangers, someone else should deal with the hitboxes
				return entity1.getHitbox().intersects(entity2.getHitbox());
			}
			return false;
			
		},

		__isPhysicalEntity : function (entity) {
			return typeof entity.$interfaces['games.common.entity.PhysicalEntity'] == 'function';
		}
	}
});