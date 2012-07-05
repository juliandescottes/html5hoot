Aria.classDefinition({
	$classpath : 'games.shoot.collision.SquareCollisionBucketBuilder',
	$extends : 'games.common.BaseObject',
	$dependencies : ['games.shoot.utils.GameType'], $implements : [],
	$constructor : function () {
		this.$BaseObject.constructor.call(this);
	},
	$prototype : {
		build : function (entities, countX, countY, totalWidth, totalHeight) {
			var buckets = this.__createEmptyBuckets(countX, countY);
			for (var i = 0 ; i < entities.length ; i++) {
				if (this.$GameType.isPhysicalEntity(entities[i])) {
					this.__storeEntityInBuckets(entities[i], buckets, countX, countY, totalWidth, totalHeight);
				}
			}
			return buckets;
		},

		__storeEntityInBuckets : function (entity, buckets, countX, countY, totalWidth, totalHeight) {
			var hitbox = entity.getHitbox();
			var bucketIndex = Math.max(0, Math.floor((hitbox.y / totalHeight) * count));
			var endBucketIndex = Math.min(count-1, Math.floor(((hitbox.y + hitbox.height)/ totalHeight) * count));
			for (var i = bucketIndex ; i <= endBucketIndex ; i++) {
				buckets[i].push(entity);
			}
		},

		__createEmptyBuckets : function (countX, countY) {
			var buckets = [];
			for (var i = 0 ; i < countX * countY ; i++) {
				buckets.push([]);
			}
			return buckets;
		}
	}
});