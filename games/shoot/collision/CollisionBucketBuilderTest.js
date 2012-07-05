Aria.testDefinition({
	$classpath : 'games.shoot.collision.CollisionBucketBuilderTest',
	$dependencies : [
		'mockato.Mockato',
		'mockato.Matchers',
		'games.common.hitbox.Hitbox',
		'games.common.entity.Entity',
		'games.common.entity.PhysicalEntity',
		'aria.utils.Array'
	],
	$prototype : {
		setup : function () {
			this.__entities = [];
			this.__bucketBuilder = new games.shoot.collision.CollisionBucketBuilder();
		},
		
		'test all physical entities are returned in buckets' : function () {
			var entity1 = this.__addPhysicalEntity(15, 10);
			var entity2 = this.__addPhysicalEntity(150, 10);
			var other = this.__addNonPhysicalEntity();

			var count = 4;
			var buckets = this.__bucketBuilder.build(this.__entities, count, 200, 200);

			this.assertEquals(count, buckets.length);

			this.assertTrue(this.__isEntityInBuckets(entity1, buckets));
			this.assertTrue(this.__isEntityInBuckets(entity2, buckets));
			this.assertFalse(this.__isEntityInBuckets(other, buckets));
		},

		'test entities overlapping with borders are in buckets' : function () {
			var entity1 = this.__addPhysicalEntity(-10, 20);
			var entity2 = this.__addPhysicalEntity(195, 20);

			var count = 4;
			var buckets = this.__bucketBuilder.build(this.__entities, count, 200, 200);

			this.assertTrue(this.__isEntityInBuckets(entity1, buckets));
			this.assertTrue(this.__isEntityInBuckets(entity2, buckets));
		},

		'test big entity is in several buckets' : function () {
			var bigEntity = this.__addPhysicalEntity(10, 180);

			var count = 4;
			var buckets = this.__bucketBuilder.build(this.__entities, count, 200, 200);
			for (var i = 0 ; i < count ; i++) {
				this.assertTrue(this.__isEntityInBucket(bigEntity, buckets[i]));	
			}			
		},

		__isEntityInBuckets : function (entity, buckets) {
			for (var i = 0 ; i < buckets.length ; i++) {
				if(this.__isEntityInBucket(entity, buckets[i])) {
					return true;
				}
			}
			return false;
		},

		__isEntityInBucket : function (entity, bucket) {
			if(aria.utils.Array.indexOf(bucket, entity) != -1) {
				return true;
			}
			return false;
		},

		__addPhysicalEntity : function (y, height) {
			var hitbox = {
				y : y,
				height : height
			};
			var physicalEntity = mockato.Mockato.mock('games.common.entity.PhysicalEntity');
			mockato.Mockato.when(physicalEntity).getHitbox().thenReturn(hitbox);
			this.__entities.push(physicalEntity);
			return physicalEntity;
		},
		__addNonPhysicalEntity : function () {
			var otherEntity = mockato.Mockato.mock('games.common.entity.Entity');
			this.__entities.push(otherEntity);
			return otherEntity;
		}
		
	}
});