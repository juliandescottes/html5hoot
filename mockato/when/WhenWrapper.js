Aria.classDefinition({
	$classpath : 'mockato.when.WhenWrapper',
	$dependencies : ['mockato.StubStore'],
	$extends : 'mockato.MethodWrapper',
	$constructor : function (methodName, mock, args) {
		this.$MethodWrapper.constructor.apply(this, arguments);
	},
	$prototype : {
		thenReturn : function (returnValue) {
			var stub = function () {return returnValue};
			mockato.StubStore.store(this.__mock, this.__methodName, this.__args, stub);
		},

		thenThrow : function (errorMessage) {
			var stub = function () {throw new Error(errorMessage)};
			mockato.StubStore.store(this.__mock, this.__methodName, this.__args, stub);
		},

		thenAnswer : function (method) {
			var mock = this.__mock;
			var stub = function () {return method.apply(mock, arguments)};
			mockato.StubStore.store(this.__mock, this.__methodName, this.__args, stub);
		}
	}
})