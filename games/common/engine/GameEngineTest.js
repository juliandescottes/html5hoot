Aria.testDefinition({
	$classpath : 'games.common.engine.GameEngineTest',
	$dependencies : [
		'mockato.Mockato',
		'mockato.Matchers',
	 	'games.common.entity.Entity',
		'games.common.input.InputRecorder', 
		'games.common.clock.AnimationLoop', 
		'games.common.clock.Timer'],
	$constructor : function () {
		this.$GameEngine = games.common.engine.GameEngine;
	},
	$prototype : {
		setUp : function () {
			var context = document.createElement("canvas").getContext("2d");
			var mockedInputHandler = mockato.Mockato.mock('games.common.input.InputRecorder');
			var animationLoop = new games.common.clock.AnimationLoop();
			this.timer = mockato.Mockato.mock('games.common.clock.Timer');
			this.engine = new this.$GameEngine(context, this.timer);

			this.mockedEntity = mockato.Mockato.mock('games.common.entity.Entity')
		},

		testAddEntitySuccessfulForValidEntityImpl : function () {
			this.engine.addEntity(this.mockedEntity);
			this.assertTrue(this.engine.getEntities().indexOf(this.mockedEntity) != -1);
		},

		testAddedEntityIsDrawn : function () {
			// given
			this.engine.addEntity(this.mockedEntity);
			
			// when
			this.engine.draw();
			
			// then
			mockato.Mockato.verify(this.mockedEntity).draw(mockato.Matchers.ANY).once();
		},

		testAddedEntityIsUpdated : function () {
			// given
			this.engine.addEntity(this.mockedEntity);
			
			// when
			this.engine.update();
			
			// then
			mockato.Mockato.verify(this.mockedEntity).update(mockato.Matchers.ANYALL).once();
		},

		testTimerWasUpdated : function () {			
			// when
			this.engine.update();
			
			// then
			mockato.Mockato.verify(this.timer).update().once();
		}
	}
});