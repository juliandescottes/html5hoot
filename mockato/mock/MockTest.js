Aria.testDefinition({
	$classpath : 'mockato.mock.MockTest',
	$dependencies : ['mockato.ClassA'],
	$prototype :  {
		setUp : function () {
			this.__classAMock = new mockato.mock.Mock('mockato.ClassA');	
			this.__classAInstance = new mockato.ClassA();	
		},

		testMockIsInstanceOfMockedClass : function () {
			this.assertTrue(aria.utils.Type.isInstanceOf(this.__classAMock, 'mockato.ClassA'));
		},

		testMethodsOfOriginalClassAreAvailableOnMock : function () {
			this.__assertHasMethod(this.__classAMock, "basicMethod");
			this.__classAMock.basicMethod();
		},

		testMethodsOnMockDontCallRealImplementation : function () {
			var valueFromMock = this.__classAMock.basicMethod();
			this.assertNotEquals(mockato.ClassA.RETURN_VALUE, valueFromMock, "Mock function returned same value as real object");
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