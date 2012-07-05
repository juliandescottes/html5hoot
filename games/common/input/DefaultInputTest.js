Aria.testDefinition({
	$classpath : 'games.common.input.DefaultInputTest',
	$prototype : {
		setUp : function () {
			this.__input = new games.common.input.DefaultInput("code");
		},
		tearDown : function () {
			if (!this.__input.isCompleted()) {
				this.__input.complete();
			}
			delete this.__input;
		},
		testGetDurationReturnsZeroIfInputJustCreated : function () {
			this.assertEquals(0, this.__input.getDuration());
		},
		testGetDurationReturns500AfterTwo250Updates : function () {
			this.__input.update(250);
			this.__input.update(250);
			this.assertEquals(500, this.__input.getDuration());
		},
		testDurationIsNotUpdatedAfterCompletion : function () {
			this.__input.update(250);
			this.__input.complete();
			this.__input.update(250);
			this.assertEquals(250, this.__input.getDuration());
		}
	}
});