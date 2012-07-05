Aria.testSuiteDefinition({
	$classpath : 'games.shoot.ShootTestSuite',
	$tests : [
		'games.shoot.entity.BoardTest',
		'games.shoot.player.PlayerControllerTest',
		'games.shoot.collision.CollisionTestSuite',
		'games.shoot.entity.engine.EngineTestSuite',
		'games.shoot.enemy.generator.GeneratorTestSuite'
	]
})