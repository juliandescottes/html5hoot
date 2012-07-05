Aria.classDefinition({
	$classpath : 'games.shoot.collision.ColliderResolverImpl',
	$dependencies : [
		'games.shoot.entity.Bullet',
		'games.shoot.collision.collider.BulletEnemyCollider',
		'games.shoot.collision.collider.BeamEnemyCollider', 
		'games.shoot.collision.collider.BulletShipCollider',
		'games.shoot.collision.collider.LootShipCollider', 
		'games.shoot.collision.collider.TractableMagnetCollider', 
		'games.shoot.utils.GameType'
	],
	$extends : 'games.common.BaseObject',
	$implements : ['games.common.collision.ColliderResolver'],
	$constructor : function () {
		this.$BaseObject.constructor.call(this);
		this.__cache = {};
	},
	$prototype : {
		getCollider : function (object1, object2) {
			if (this.__cache[object1.$classpath] && typeof this.__cache[object1.$classpath][object2.$classpath] != "undefined") {
				return this.__cache[object1.$classpath][object2.$classpath];
			}
			var collider = this.__computeCollider(object1, object2) || this.__computeCollider(object2, object1);

			this.__storeInCache(object1, object2, collider);

			return collider;
		},

		__computeCollider : function (object1, object2) {
			var collider = null;
			if (this.$GameType.isBullet(object1)) {
				collider = this.__resolveBulletCollision(object1, object2);
			} else if (this.$GameType.isBeam(object1)) {
				collider = this.__resolveBeamCollision(object1, object2);
			} else if (this.$GameType.isLoot(object1)) {
				collider = this.__resolveLootCollision(object1, object2);
			} else if (this.$GameType.isMagnet(object1)) {
				collider = this.__resolveMagnetCollision(object1, object2);
			}
			return collider;
		},

		__resolveBeamCollision : function (beam, entity) {
			var collider = null;
			if (this.$GameType.isPhysicalEnemy(entity)) {
				return new this.$BeamEnemyCollider();
			}
			return collider;
		},

		__resolveLootCollision : function (loot, entity) {
			var collider = null;
			if (this.$GameType.isShip(entity)) {
				return new this.$LootShipCollider();
			} 
			return collider;
		},

		__resolveMagnetCollision : function (magnet, entity) {
			var collider = null;
			if (this.$GameType.isTractable(entity)) {
				return new this.$TractableMagnetCollider();
			}
			return collider;
		},

		__resolveBulletCollision : function (bullet, entity) {
			var collider = null;
			if (this.$GameType.isPhysicalEnemy(entity) && bullet.isPlayerBullet()) {
				return new this.$BulletEnemyCollider();
			} else if (this.$GameType.isShip(entity) && bullet.isEnemyBullet()) {
				return new this.$BulletShipCollider();
			}
			return collider;
		},

		__storeInCache : function (object1, object2, collider) {
			if (!this.__cache[object1.$classpath]) {
				this.__cache[object1.$classpath] = {};
			}
			this.__cache[object1.$classpath][object2.$classpath] = collider;
		}
	}
});