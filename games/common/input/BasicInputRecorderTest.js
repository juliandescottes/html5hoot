Aria.testDefinition({
	$classpath : 'games.common.input.BasicInputRecorderTest',
	$dependencies : [
		'mockato.Mockato',
		'games.common.input.Input'
	],
	$statics : {
		SOME_DELTA : 200,
		INPUT_CODE : 'code'
	},
	$prototype : {
		setup : function () {
			this.__recorder = new games.common.input.BasicInputRecorder(); 	
			this.__mockInput = mockato.Mockato.mock('games.common.input.Input');
			mockato.Mockato.when(this.__mockInput).getCode().thenReturn(this.INPUT_CODE);
			this.__recorder.addInput(this.__mockInput);
		},
		testAddedInputCanBeRetrieved : function () {
			this.__assertInputCanBeRetrieved();
		},
		testAddedInputCanBeRetrievedAfterAnUpdate : function () {
			this.__recorder.update(this.SOME_DELTA);
			this.__assertInputCanBeRetrieved();
		},
		testCompletedInputCanOnlyBeRetrievedOnce : function () {
			this.__recorder.update(this.SOME_DELTA);
			this.__assertInputCanBeRetrieved();

			mockato.Mockato.when(this.__mockInput).isCompleted().thenReturn(true);
			this.__recorder.update(this.SOME_DELTA);
			this.__assertInputCanBeRetrieved();

			this.__recorder.update(this.SOME_DELTA);
			this.__assertInputCanNotBeRetrieved();
		},

		testInputOfAlreadyExistingCodeCanNotBeRetrieved : function () {

			var otherInput = mockato.Mockato.mock('games.common.input.Input');
			mockato.Mockato.when(otherInput).getCode().thenReturn(this.INPUT_CODE);
			this.__recorder.addInput(otherInput);

			this.__recorder.update(this.SOME_DELTA);
			var retrievedInput = this.__recorder.getInputByCode(this.INPUT_CODE);
			this.assertEquals(retrievedInput, this.__mockInput);
			this.assertNotEquals(retrievedInput, otherInput);
		},

		__assertInputCanBeRetrieved : function () {
			var retrievedInput = this.__recorder.getInputByCode(this.INPUT_CODE);
			this.assertTrue(typeof retrievedInput != 'undefined' && retrievedInput !== null);
		},

		__assertInputCanNotBeRetrieved : function () {
			var retrievedInput = this.__recorder.getInputByCode(this.INPUT_CODE);
			this.assertFalse(typeof retrievedInput != 'undefined' && retrievedInput !== null);
		}
	}
});