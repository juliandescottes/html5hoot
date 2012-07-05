Aria.testDefinition({
	$classpath : 'mockato.mock.MockTestInheritedClasses',
	$dependencies : ['mockato.ClassAChild'],
	$prototype :  {
		setUp : function () {
			this.__childClassMock = new mockato.mock.Mock('mockato.ClassAChild');
		},

		testMockIsInstanceOfMockedClass : function () {
			this.assertTrue(aria.utils.Type.isInstanceOf(this.__childClassMock, 'mockato.ClassAChild'));
		},

		testMethodsOfOriginalClassAreAvailableOnMock : function () {
			this.__assertHasMethod(this.__childClassMock, "childMethod");
			this.__childClassMock.childMethod();
		},

		testMethodsOfParentClassAreAvailableOnMock : function () {
			this.__assertHasMethod(this.__childClassMock, "basicMethod");
			this.__childClassMock.basicMethod();
		},

		testMethodsOfParentAreNotActualImplementation : function () {
			var valueFromMock = this.__childClassMock.basicMethod();
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