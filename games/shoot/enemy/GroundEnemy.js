Aria.classDefinition({
	$classpath : 'games.shoot.enemy.GroundEnemy',
	$dependencies : ['games.shoot.enemy.EnemyTypes'],
	$extends : 'games.common.entity.DestroyableEntity',
	$constructor : function () {
		this.$DestroyableEntity.constructor.call(this);
	},
	$prototype : {
		getType : function () {
			return this.$EnemyTypes.GROUND;
		}
	}
});