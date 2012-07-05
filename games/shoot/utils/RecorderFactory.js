Aria.classDefinition({
	$classpath : 'games.shoot.utils.RecorderFactory',
	$dependencies : ['games.common.input.KeyboardRecorder'],
	$statics : {
		getKeyboardRecorder : function () {
			var keyboardRecorder = new games.common.input.KeyboardRecorder();
			this.getKeyboardRecorder = function () {
				return keyboardRecorder;
			};		
			return this.getKeyboardRecorder();
		},

		getTouchInputRecorder : function () {
			var touchInputRecorder =  new games.common.input.TouchInputRecorder();
			this.getTouchInputRecorder = function () {
				return touchInputRecorder;
			}
			return this.getTouchInputRecorder();
		}
	}
});