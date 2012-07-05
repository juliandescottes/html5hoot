Aria.classDefinition({
	$classpath : 'games.shoot.utils.Environment',
	$statics : {
		BOARD : {
			WIDTH : 480,
			HEIGHT : 640,
			SCALE : 1
		},
		getEngine : function () {
			return games.shoot.utils.Environment.__engine;
		},
		setEngine : function (engine) {
			games.shoot.utils.Environment.__engine = engine;
		}
	}
});