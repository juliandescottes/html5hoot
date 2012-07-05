Aria.classDefinition({
	$classpath : 'games.common.input.MouseRecorder',
	$extends : 'games.common.input.BasicInputRecorder',
	$dependencies : [
		'games.common.input.MouseInput', 
		'aria.utils.Event', 
		'aria.utils.Array'
	], 
	$implements : ['games.common.input.InputRecorder'],
	$constructor : function () {
		this.$BasicInputRecorder.constructor.call(this);
	},
	$prototype : {
		start : function () {
			this.$Event.addListener(document, "mousedown", {fn : this.__onMousedown, scope : this});
			this.$Event.addListener(document, "mouseup", {fn : this.__onMouseup, scope : this});
		},

		stop : function () {
			this.$Event.removeListener(document, "mousedown", {fn : this.__onMousedown, scope : this});
			this.$Event.removeListener(document, "mouseup", {fn : this.__onMouseup, scope : this});
		},
		
		__onMousedown : function (evt) {
			var code = this.__getCodeFromEvent(evt);
			this.addInput(new this.$MouseInput(code, evt));
		},
		
		__onMouseup : function (evt) {
			var code = this.__getCodeFromEvent(evt);
			var input = this.getInputByCode(code);
			if (input) {
				input.updateEvent(evt);
				input.complete();
			}	
		},

		__getCodeFromEvent : function (evt) {
			return "MOUSE_" + evt.button;
		}
	}
});