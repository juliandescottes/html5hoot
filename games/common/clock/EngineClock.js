Aria.classDefinition({
	$classpath : 'games.common.clock.EngineClock',
	$extends : 'games.common.BaseObject',
	$dependencies : ['games.common.clock.AnimationLoop'], 
	$statics : {
		getDefaultImplementation : function (engine) {
			var animationLoop = new games.common.clock.AnimationLoop();
			return new games.common.clock.EngineClock(engine, animationLoop);
		} 
	},
	$constructor : function (engine, animationLoop) {
		this.$BaseObject.constructor.call(this);
		this.__engine = engine;
		this.__animationLoop = animationLoop;
		this.__animationLoop.setLoopCallback(this.onLoop, this);
	},
	$prototype : {
		start : function () {
			this.__animationLoop.start();
		},
		stop : function () {
			this.__animationLoop.stop();
		},
		isOn : function () {
			return this.__animationLoop.isOn();
		},
		onLoop : function () {
			this.__engine.update();
			this.__engine.draw();
		}
	}
});