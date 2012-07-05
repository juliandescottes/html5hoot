Aria.classDefinition({
	$classpath : 'mockato.verify.VerifyWrapper',
	$dependencies : ['mockato.CallHistory'],
	$extends : 'mockato.MethodWrapper',
	$constructor : function (methodName, mock, args) {
		this.$MethodWrapper.constructor.apply(this, [methodName, mock, args]);
	},
	$prototype : {
		once : function () {
			return this.times(1)
		},
		
		times : function (times) {
			this.atLeast(times);
			this.atMost(times);
		},
		
		atLeast : function (times) {
			var calls = mockato.CallHistory.get(this.__mock, this.__methodName, this.__args);
			if (calls.length < times) {
				throw new Error('Mock was called less ('+ calls.length +') than expected ('+ times +')');
			}
		},
		
		atLeastOnce : function () {
			this.atLeast(1);
		},
		
		atMost : function (times) {
			var calls = mockato.CallHistory.get(this.__mock, this.__methodName, this.__args);
			if (calls.length > times) {
				throw new Error('Mock was called more ('+ calls.length +') than expected ('+ times +')');
			}
		},				
		
		never : function () {
			var calls = mockato.CallHistory.get(this.__mock, this.__methodName, this.__args);
			if (calls.length != 0) {
				throw new Error('Mock was called (expected not called).');
			}
		},

		wasNeverCalled : function () {
			return this.never();
		},

		wasCalled : function () {
			return this.atLeastOnce();
		}
	}
});