Aria.classDefinition({
	$classpath : 'games.shoot.enemy.generator.DefaultEnemyGenerator',
	$extends : 'games.common.BaseObject',
	$constructor : function (cooldown, enemyFormationBuilder, engine) {
		this.$BaseObject.constructor.call(this);
		this.__cooldown = cooldown;
		this.__lastGenerationTime = 0;
		this.__enemyFormationBuilder = enemyFormationBuilder;
		this.__engine = engine;
	},
	$prototype : {
		update : function (timer) {
			if (timer.getTotalGameTime() - this.__lastGenerationTime > this.__cooldown) {
				this.__lastGenerationTime = timer.getTotalGameTime();
				(new this.__enemyFormationBuilder(this.__engine)).build();
			}
		}
	}
})