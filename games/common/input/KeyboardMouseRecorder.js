Aria.classDefinition({
	$classpath : 'games.common.input.KeyboardMouseRecorder',
	$extends : 'games.common.input.CompositeInputRecorder',
	$dependencies : [
		'games.common.input.KeyboardRecorder', 'games.common.input.MouseRecorder', 
		'games.common.assert.Assert', 'aria.utils.Array'], 
	$implements : ['games.common.input.InputRecorder'],
	$statics : {
		getDefaultImplementation : function () {
			var keyboardRecorder = new games.common.input.KeyboardRecorder();
			var mouseRecorder = new games.common.input.MouseRecorder();
			return new games.common.input.KeyboardMouseRecorder(keyboardRecorder, mouseRecorder);
		}
	},
	$constructor : function (keyboardRecorder, mouseRecorder) {
		this.$CompositeInputRecorder.constructor.call(this, [keyboardRecorder, mouseRecorder]);
	}
});