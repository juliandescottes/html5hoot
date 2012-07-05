Aria.classDefinition({
	$classpath : 'games.shoot.entity.EntitySorter',
	$extends : 'games.common.BaseObject',
	$dependencies : [
		'games.shoot.utils.GameType'
	],
	$constructor : function () {
		this.$BaseObject.constructor.call(this);
	},
	$prototype : {
		sort : function (entities) {
			var entitiesByLayer = this.splitEntitiesInLayers(entities);
			var sortedEntities = [];

			for (var i = 0 ; i < entitiesByLayer.length ; i++) {
				if (entitiesByLayer[i]) {
					sortedEntities = sortedEntities.concat(entitiesByLayer[i]);
				}
			}

			return sortedEntities;
		},

		/**
		 * @private
		 */
		splitEntitiesInLayers : function (entities) {
			var layers = [];
			for (var i = 0 ; i < entities.length ; i++) {
				var entity = entities[i];
				var layerId = this.getLayerForEntity(entity);
				(layers[layerId] = layers[layerId] || []);
				layers[layerId].push(entity);
			}

			return layers;
		},

		/**
		 * @private
		 */
		getLayerForEntity : function (entity) {
			var type = this.$GameType;

			if (type.isBoard(entity))       return 0
			if (type.isGroundEnemy(entity)) return 2
			if (type.isLoot(entity))        return 3
			if (type.isBeam(entity))        return 4
			if (type.isAirEnemy(entity))    return 5
			if (type.isExplosion(entity))   return 6
			if (type.isShip(entity))        return 7
			if (type.isBullet(entity))      return 8
			if (type.isOverlay(entity))     return 9

			return 1;
		}
	}
});