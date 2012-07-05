Aria.classDefinition({
	$classpath : 'games.common.input.CompositeInputRecorder',
	$extends : 'games.common.BaseObject',
	$dependencies : [
		'games.common.assert.Assert',
		'aria.utils.Array'
	],
	$implements : ['games.common.input.InputRecorder'],
	$constructor : function (recorders) {
		this.$BaseObject.constructor.call(this);
		this.__recorders = this.$Assert.isArrayOf(recorders, 'games.common.input.InputRecorder');
	},
	$prototype : {
		start : function () {
			this.$Array.forEach(this.__recorders, function (recorder) {
				recorder.start();
			});
		},
		stop : function () {
			this.$Array.forEach(this.__recorders, function (recorder) {
				recorder.stop();
			});
		},
		getInputByCode : function (code) {
			for (var i = 0 ; i < this.__recorders.length ; i++) {
				var recorder = this.__recorders[i];
				if (recorder.getInputByCode(code)) {
					return recorder.getInputByCode(code);
				}
			}
			return null;
		},

		update : function (gameTime) {
			this.$Array.forEach(this.__recorders, function (recorder) {
				recorder.update(gameTime);
			});
		}
	}
});