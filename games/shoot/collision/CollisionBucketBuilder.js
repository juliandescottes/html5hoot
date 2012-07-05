Aria.classDefinition({
	$classpath : 'games.shoot.collision.CollisionBucketBuilder',
	$extends : 'games.common.BaseObject',
	$dependencies : ['games.shoot.utils.GameType'], $implements : [],
	$constructor : function () {
		this.$BaseObject.constructor.call(this);
	},
	$prototype : {
		build : function (entities, count, totalWidth, totalHeight) {
			var buckets = this.__createEmptyBuckets(count);
			for (var i = 0 ; i < entities.length ; i++) {
				if (this.$GameType.isPhysicalEntity(entities[i])) {
					this.__storeEntityInBuckets(entities[i], buckets, count, totalWidth, totalHeight);
				}
			}
			return buckets;
		},

		__storeEntityInBuckets : function (entity, buckets, count, totalWidth, totalHeight) {
			var hitbox = entity.getHitbox();
			var bucketIndex = Math.max(0, Math.floor((hitbox.y / totalHeight) * count));
			var endBucketIndex = Math.min(count-1, Math.floor(((hitbox.y + hitbox.height)/ totalHeight) * count));
			for (var i = bucketIndex ; i <= endBucketIndex ; i++) {
				buckets[i].push(entity);
			}
		},

		__createEmptyBuckets : function (count) {
			var buckets = [];
			for (var i = 0 ; i < count ; i++) {
				buckets.push([]);
			}
			return buckets;
		}
	}
});