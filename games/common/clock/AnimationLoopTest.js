Aria.testDefinition({
	$classpath : 'games.common.clock.AnimationLoopTest',
	$constructor : function () {
		this.$AnimationLoop = games.common.clock.AnimationLoop;
	},
	$prototype : {
		setUp : function () {
			this.__loopCounter = 0;
			this.animationLoop = new this.$AnimationLoop();
			this.animationLoop.setLoopCallback(this.loop, this);
		},
		
		tearDown : function () {
			this.animationLoop.$dispose();
		},
		
		testAsyncClockFiresEventsAfterBeingStarted : function () {
			this.animationLoop.start();
			this.callAfter100Ms(this.checkLoopedSeveralTimes);
		},
		
		testAsyncClockCanBeStopped : function () {
			this.animationLoop.start();
			this.callAfter100Ms(function(){
				this.animationLoop.stop();
				this.resetLoopCounter();
				this.callAfter100Ms(this.checkDidNotLoop);
			});
		},
		
		checkLoopedSeveralTimes : function () {
			this.assertTrue(this.__loopCounter >= 2, "Clock ticked only : " + this.__loopCounter);
		},
		
		checkDidNotLoop : function () {
			this.assertTrue(this.__loopCounter === 0, "Clock Ticks were captured");
		},
		
		resetLoopCounter : function () {
			this.__loopCounter = 0
		},
		
		loop : function () {
			this.__loopCounter++;
		}
	}
});