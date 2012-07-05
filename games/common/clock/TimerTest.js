Aria.testDefinition({
	$classpath : 'games.common.clock.TimerTest',
	$statics : {
		SMALL_MAX_DELTA : 10,
		BIG_MAX_DELTA : 1000
	},
	$prototype : {
		testAsyncGetDeltaIsEqualToMax : function() {
			var timer = new games.common.clock.Timer(this.SMALL_MAX_DELTA);
			timer.update();
			this.callAfter100Ms(function() {
				timer.update();
				this.assertEquals(this.SMALL_MAX_DELTA, timer.getDelta());
			});
		},
		testAsyncGetDeltaIsLowerThanBigMax : function() {
			var timer = new games.common.clock.Timer(this.BIG_MAX_DELTA);
			timer.update();
			this.callAfter100Ms(function() {
				timer.update();
				this.assertTrue(this.BIG_MAX_DELTA > timer.getDelta());
			});
		}
	}
})