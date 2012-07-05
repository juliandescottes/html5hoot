Aria.classDefinition({
	$classpath : 'games.common.input.KeyboardRecorder',
	$extends : 'games.common.input.BasicInputRecorder',
	$dependencies : ['games.common.input.DefaultInput', 'aria.utils.Event', 'aria.utils.Array'], 
	$implements : ['games.common.input.InputRecorder'],
	$constructor : function () {
		this.$BasicInputRecorder.constructor.call(this);
	},
	$prototype : {
		start : function () {
			this.$Event.addListener(document, "keydown", {fn : this.__onKeydown, scope : this});
			this.$Event.addListener(document, "keyup", {fn : this.__onKeyup, scope : this});
		},

		stop : function () {
			this.$Event.removeListener(document, "keydown", {fn : this.__onKeydown, scope : this});
			this.$Event.removeListener(document, "keyup", {fn : this.__onKeyup, scope : this});
		},
		
		__onKeydown : function (evt) {
			var code = this.__getCodeFromEvent(evt);
			this.addInput(new this.$DefaultInput(code, this._currentGameTime));
		},
		
		__onKeyup : function (evt) {
			var code = this.__getCodeFromEvent(evt);
			var input = this.getInputByCode(code);
			if (input) {
				input.complete();	
			}			
		},

		__getCodeFromEvent : function (evt) {
			return "KEYBOARD_" + evt.keyCode;
		}
	}
});