Aria.interfaceDefinition({
	$classpath : 'games.common.input.InputRecorder',
	$interface : {
		start : function () {},
		stop : function () {},
		
		/**
		 * Called by the engine at the beginning of each loop
		 * This should be the opportunity for the handler to remove deprecated inputs, and to process latest ones
		 * @param {Number} Current game time
		 */ 
		update : function (time) {},

		/**
		 * Query the recorder to retrieve a user input with a certain code.
		 * Each recorder might use completely different code sets
		 * @param {String} code 
		 */
		getInputByCode : function (code) {}
		
	}
})