Aria.classDefinition({
	$classpath : 'games.common.input.BasicInputRecorder',
	$extends : 'games.common.BaseObject',
	$dependencies : ['aria.utils.Array'], $implements : ['games.common.input.InputRecorder'],
	$constructor : function () {
		this.$BaseObject.constructor.call(this);
		this._currentGameTime = -1;
		this.__inputs = {};
		this.__publishedInputs = {};
	},
	$prototype : {
		start : function () {
			throw new Error("BasicInputRecorder:start is an abstract method");
		},

		stop : function () {
			throw new Error("BasicInputRecorder:stop is an abstract method");
		},

		update : function (gameTime) {
			this._currentGameTime = gameTime;
			this.__publishInputs();
			this.__removeCompletedInputs();
		},

		getInputByCode : function (code) {
			return this.__publishedInputs[code] || null;
		},

		addInput : function (input) {
			var code = input.getCode();
			var existingInput = this.__getInternalInputByCode(code); 
			if (!existingInput) {
				this.__inputs[code] = input;
				this.__publishedInputs[code] = input;
			}
		},

		__publishInputs : function () {
			this.__publishedInputs = {};
			for (var code in this.__inputs) {
				if (!this.__inputs.hasOwnProperty(code)) continue;
				this.__publishedInputs[code] = this.__inputs[code];
			}
		},

		__removeCompletedInputs : function () {
			for (var code in this.__inputs) {
				if (!this.__inputs.hasOwnProperty(code)) continue;
				if (this.__inputs[code].isCompleted()) {
					delete this.__inputs[code];
				}
			}
		},

		__getInternalInputByCode : function (code) {
			return this.__inputs[code] || null;
		},

		__completeInputByCode : function (code) {
			var input = this.__getInternalInputByCode(code);
			if (input) {
				input.complete();
			};
		}
	}
});