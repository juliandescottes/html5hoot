Aria.classDefinition({
	$classpath : 'games.shoot.ship.ShipInputRecorder',
	$extends : 'games.common.input.CompositeInputRecorder',
	$dependencies : [
		'games.common.assert.Assert',
		'games.common.input.DefaultInput',
		'games.shoot.utils.RecorderFactory',
		'aria.utils.Array'
	], 
	$implements : ['games.common.input.InputRecorder'],
	$statics : {
		FIRE : 'fireBullet',
		BEAM : 'beam',
		move_LEFT : 'left',
		move_RIGHT : 'right',
		move_UP : 'up',
		move_DOWN : 'down'
	},
	$constructor : function (recorder) {
		this.$CompositeInputRecorder.constructor.call(this, [recorder]);
		this.__recorder = recorder;
	},
	$prototype : {
		getInputByCode : function (code) {
			var matches = this.__translateToDeviceCodes(code);
			for (var i = 0 ; i < matches.length ; i++) {
				var input = this.__recorder.getInputByCode(matches[i]);
				if (input) {
					return input;
				}
			}
		},
		
		__translateToDeviceCodes : function (code) {
			if (code == this.move_UP) {
				return ["KEYBOARD_38"];
			} else if (code == this.move_DOWN) {
				return ["KEYBOARD_40"];
			} else if (code == this.move_UP) {
				return ["KEYBOARD_38"];
			} else if (code == this.move_LEFT) {
				return ["KEYBOARD_37"];
			} else if (code == this.move_RIGHT) {
				return ["KEYBOARD_39"];
			} else if (code == this.FIRE) {
				return ["KEYBOARD_32", "KEYBOARD_16"];
			} else if (code == this.BEAM) {
				return ["KEYBOARD_88"];
			} else {
				return [];
			}
		}
	}
});