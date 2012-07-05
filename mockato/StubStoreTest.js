Aria.testDefinition({
	$classpath : 'mockato.StubStoreTest',
	$dependencies : ['mockato.Mockato', 'mockato.ClassA'],
	$statics : {
		METHOD_NAME : "methodName",
		ARG_SET_1 : ["arg"]
	},
	$prototype : {
		testStoreAndGet : function () {
			var mock = mockato.Mockato.mock('mockato.ClassA');
			var stub = function () {};
			mockato.StubStore.store(mock, this.METHOD_NAME, this.ARG_SET_1,  stub);
			
			var retrievedStub = mockato.StubStore.get(mock, this.METHOD_NAME, this.ARG_SET_1);
			this.assertTrue(typeof retrievedStub != "undefined" && retrievedStub !== null);	
		}
	}
})