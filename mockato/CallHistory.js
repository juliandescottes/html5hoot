Aria.classDefinition({
	$classpath : 'mockato.CallHistory',
	$dependencies : ['mockato.ArgumentsComparator'],
	$statics : {
		store : function (mock, method, args) {
			var args = this.__stripTrailingUndefinedArgs(args);
			this.__getCallHistory(mock, method).push({
				args : args,
				time : Date.now()
			})
		},
		get : function (mock, method, args) {
			var calls =  this.__getCallHistory(mock, method);
			var matches = [];
			for (var i = 0 ; i < calls.length ; i++) {
				if (mockato.ArgumentsComparator.compare(args, calls[i].args)) {
					matches.push(calls[i]);
				}
			}
			return matches;
		},

		__getCallHistory : function (mock, method) {
			if (!mock[method+"_____calls"]) {
				mock[method+"_____calls"] = [];
			}
			return mock[method+"_____calls"]
		},

		__stripTrailingUndefinedArgs : function (args) {
			for (var i = args.length - 1 ; i >= 0  ; i--) {
				if (typeof args[i] == 'undefined') {
					Array.prototype.splice.call(args, i, 1);
				} else {
					break;
				}
			}
			return args;
		}
	},
	$constructor : function () {}
});