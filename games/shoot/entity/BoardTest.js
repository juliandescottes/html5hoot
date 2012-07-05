Aria.testDefinition({
	$classpath : 'games.shoot.entity.BoardTest',
	$prototype : {
		testBoardInstanceIsOk : function () {
			var board = new games.shoot.entity.Board();
		}
	}
});