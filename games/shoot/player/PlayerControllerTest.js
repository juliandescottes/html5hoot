Aria.testDefinition({
	$classpath : 'games.shoot.player.PlayerControllerTest',
	$dependencies : [
		'mockato.Mockato', 
		'games.common.engine.Engine',
		'games.common.input.InputRecorder',
		'games.common.clock.Timer'
	],
	$prototype : {
		setup : function () {
			this.__engine = mockato.Mockato.mock('games.common.engine.Engine'); 
			this.__inputRecorder = mockato.Mockato.mock('games.common.input.InputRecorder');	
		},

		testCanBeInstanciatedWithEngine : function () {
			var shipController = new games.shoot.player.PlayerController(this.__engine, this.__inputRecorder);
		},

		testUpdateWithValidDelta : function () {
			var shipController = new games.shoot.player.PlayerController(this.__engine, this.__inputRecorder);
			shipController.update(mockato.Mockato.mock('games.common.clock.Timer'));
		}
	}
});