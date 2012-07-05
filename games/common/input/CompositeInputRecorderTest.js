Aria.testDefinition({
	$classpath : 'games.common.input.CompositeInputRecorderTest',
	$dependencies : [
		'games.common.input.KeyboardRecorder', 
		'games.common.input.DefaultInput',
		'mockato.Mockato'
	],
	$statics : {
		INPUT_CODE_1 : "INPUT_CODE_1",
		INPUT_CODE_2 : "INPUT_CODE_2"
	},
	$prototype : {
		testConstructorCrashesForInvalidRecorders : function () {
			this.__assertConstructorCrashes({});
			this.__assertConstructorCrashes([this.__createMockedRecorder(), "someString"]);
			this.__assertConstructorCrashes(this.__createMockedRecorder());
		},
		
		testConstructorIsOkForValidRecorders : function () {
			this.__assertConstructorPasses([]);
			this.__assertConstructorPasses([this.__createMockedRecorder()]);
			this.__assertConstructorPasses([this.__createMockedRecorder(), this.__createMockedRecorder()]);
		},

		testGetInputByCodeReturnsInputFromSubRecorder : function () {
			var mockedRecorder = this.__createMockedRecorder();
			var mockedInput = this.__createMockedInput();
			var inputCode1 = this.INPUT_CODE_1;
			mockedRecorder.getInputByCode = function (code) {
				return code == inputCode1 ? mockedInput : null;
			}

			var compositeRecorder = new games.common.input.CompositeInputRecorder([mockedRecorder]);

			compositeRecorder.start();
			compositeRecorder.update();
			
			this.assertEquals(mockedInput, compositeRecorder.getInputByCode(this.INPUT_CODE_1));
			this.assertEquals(null, compositeRecorder.getInputByCode("some_other_code"));
		},

		__assertConstructorCrashes : function (recorders) {
			var hasFailed = this.__hasConstructorCrashed(recorders);
			this.assertTrue(hasFailed, "constructor should have crashed");
		},

		__assertConstructorPasses : function (recorders) {
			var hasFailed = this.__hasConstructorCrashed(recorders);
			this.assertFalse(hasFailed, "constructor should not have crashed");
		},

		__hasConstructorCrashed : function (recorders) {
			try {
				new games.common.input.CompositeInputRecorder(recorders);
				return false;
			} catch (expected) {
				return true;
			}
		},

		__createMockedRecorder : function () {
			return mockato.Mockato.mock('games.common.input.KeyboardRecorder');
		},

		__createMockedInput : function () {
			return mockato.Mockato.mock('games.common.input.DefaultInput');
		}
	}
});