Aria.classDefinition({
	$classpath : 'mockato.when.When',
	$dependencies : ['mockato.when.WhenWrapper'],
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
				return new mockato.when.WhenWrapper(methodName, mock, arguments);
			}
		}
	}
});