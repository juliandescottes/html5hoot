Aria.classDefinition({
	$classpath : 'games.shoot.utils.GameType',
	$extends : 'games.common.BaseObject',
	$dependencies : ['aria.utils.Type', 'games.shoot.enemy.EnemyTypes'],
	$constructor : function () {
		this.$BaseObject.constructor.call(this);
	},
	$statics : {
		isBullet : function (entity) {
			return aria.utils.Type.isInstanceOf(entity, 'games.shoot.entity.Bullet');
		},

		isBeam : function (entity) {
			return aria.utils.Type.isInstanceOf(entity, 'games.shoot.ship.Beam');			
		},

		isShip : function (entity) {
			return aria.utils.Type.isInstanceOf(entity, 'games.shoot.ship.Ship');
		},

		isMagnet : function (entity) {
			return aria.utils.Type.isInstanceOf(entity, 'games.shoot.ship.Magnet');
		},

		isBoard : function (entity) {
			return aria.utils.Type.isInstanceOf(entity, 'games.shoot.entity.SpriteBoard');
		},

		isExplosion : function (entity) {
			return aria.utils.Type.isInstanceOf(entity, 'games.shoot.entity.Explosion');
		},

		isPhysicalEnemy : function (entity) {
			return games.shoot.utils.GameType.__instanceOf(entity, 'games.shoot.enemy.PhysicalEnemy');
		},

		isPhysicalEntity : function (entity) {
			return entity && entity.$interfaces && typeof entity.$interfaces['games.common.entity.PhysicalEntity'] == 'function';
		},

		isOverlay : function (entity) {
			return entity && entity.$interfaces && typeof entity.$interfaces['games.shoot.overlay.OverlayEntity'] == 'function'
		},

		isLoot : function (entity) {
			return entity && entity.$interfaces && typeof entity.$interfaces['games.shoot.entity.loot.Loot'] == 'function';
		},

		isPowerUp : function (entity) {
			return games.shoot.utils.GameType.__instanceOf(entity, 'games.shoot.entity.loot.powerup.Power');
		},

		isTractable : function (entity) {
			return entity && entity.$interfaces && typeof entity.$interfaces['games.shoot.entity.TractableEntity'] == 'function';
		},

		isAirEnemy : function (entity) {
			return games.shoot.utils.GameType.isPhysicalEnemy(entity) && entity.getType() == games.shoot.enemy.EnemyTypes.AIR;
		},

		isGroundEnemy : function (entity) {
			return games.shoot.utils.GameType.isPhysicalEnemy(entity) && entity.getType() == games.shoot.enemy.EnemyTypes.GROUND;
		},
		
		__instanceOf : function (object, classpath) {
			var instanceOf = aria.utils.Type.isInstanceOf(object, classpath);
			var implementationOf = object && object.$interfaces && typeof object.$interfaces[classpath] == 'function';
			return instanceOf || implementationOf;
		}
	}
});