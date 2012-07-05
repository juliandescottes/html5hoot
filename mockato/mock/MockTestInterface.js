Aria.testDefinition({
	$classpath : 'mockato.mock.MockTestInterface',
	$dependencies : ['mockato.InterfaceA'],
	$prototype :  {
		setUp : function () {
			this.__interfaceAMock = new mockato.mock.Mock('mockato.InterfaceA');	
		},

		testMockIsInstanceOfMockedClass : function () {
			this.assertTrue(typeof this.__interfaceAMock.$interfaces['mockato.InterfaceA'] == 'function');
		},

		testMethodsOfOriginalClassAreAvailableOnMock : function () {
			this.__assertHasMethod(this.__interfaceAMock, "basicMethod");
			this.__interfaceAMock.basicMethod();
		},

		__assertHasMethod : function (mock, methodName) {
			this.__assertHasProperty(mock, methodName);
			this.assertTrue(aria.utils.Type.isFunction(mock[methodName]), "Mock has no method called " + methodName);
		},

		__assertHasProperty : function (mock, propertyName) {
			this.assertTrue(typeof mock[propertyName] != 'undefined', "Mock has no property called " + propertyName);
		}
	}
});