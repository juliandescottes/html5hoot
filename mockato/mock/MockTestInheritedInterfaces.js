Aria.testDefinition({
	$classpath : 'mockato.mock.MockTestInheritedInterfaces',
	$dependencies : ['mockato.InterfaceAChild'],
	$prototype :  {
		setUp : function () {
			this.__childInterfaceMock = new mockato.mock.Mock('mockato.InterfaceAChild');
		},

		testMockImplementsMockedClass : function () {
			this.assertTrue(typeof this.__childInterfaceMock.$interfaces['mockato.InterfaceAChild'] == 'function');
		},

		testMethodsOfOriginalClassAreAvailableOnMock : function () {
			this.__assertHasMethod(this.__childInterfaceMock, "childMethod");
			this.__childInterfaceMock.childMethod();
		},

		testMethodsOfParentClassAreAvailableOnMock : function () {
			this.__assertHasMethod(this.__childInterfaceMock, "basicMethod");
			this.__childInterfaceMock.basicMethod();
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