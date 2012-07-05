Aria.testDefinition({
	$classpath : 'games.shoot.enemy.generator.DefaultEnemyGeneratorTest',
	$dependencies : ['games.shoot.enemy.EnemyFormationBuilder'],
	$constructor : function () {
		this.$TestCase
	},
	$prototype : {
		testUpdateCallsFormationBuilder : function () {
			var formationBuilder = mockato.Mockato.mock('games.shoot.enemy.EnemyFormationBuilder');
			var defaultEnemyGenerator = new games.shoot.enemy.generator.DefaultEnemyGenerator();

		}
	}
});