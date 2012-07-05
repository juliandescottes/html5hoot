Aria.classDefinition({
	$classpath : 'mockato.StubStore',
	$dependencies : ['mockato.ArgumentsComparator'],
	$statics : {
		store : function (mock, methodName, args, stub) {
			this.__getStubContainer(mock, methodName).push({args : args, stub : stub});
		},
		
		get : function (mock, methodName, args) {
			var stubs = this.__getStubContainer(mock, methodName);
			for (var i = 0 ; i < stubs.length ; i++) {
				var storedStub = stubs[i];
				if (mockato.ArgumentsComparator.compare(storedStub.args, args)) {
					return storedStub.stub;
				}
			}
		},

		__getStubContainer : function (mock, methodName) {
			if (!mock[methodName+"_____stubs"]) {
				mock[methodName+"_____stubs"] = [];
			}
			return mock[methodName+"_____stubs"]
		}
	},
	$constructor : function () {}	
})