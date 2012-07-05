Aria.classDefinition({
	$classpath : 'mockato.verify.Verify',
	$dependencies : ['mockato.verify.VerifyWrapper'],
	$constructor : function (mock) {
		for (var i in mock) {
			if (aria.utils.Type.isFunction(mock[i])){
				this[i] = this._createWrappedMethod(i, mock);
			}
		}	
	},
	$prototype : {
		_createWrappedMethod : function (methodName, mock) {
			return function() {
				return new mockato.verify.VerifyWrapper(methodName, mock, arguments);
			}
		}
	}
});