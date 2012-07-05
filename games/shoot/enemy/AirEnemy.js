Aria.classDefinition({
	$classpath : 'games.shoot.enemy.AirEnemy',
	$dependencies : ['games.shoot.enemy.EnemyTypes'],
	$extends : 'games.common.entity.DestroyableEntity',
	$constructor : function () {
		this.$DestroyableEntity.constructor.call(this);
	},
	$prototype : {
		getType : function () {
			return this.$EnemyTypes.AIR;
		}
	}
});