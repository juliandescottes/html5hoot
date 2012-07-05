Aria.testDefinition({
	$classpath : 'mockato.mock.MockedClassDefinitionBuilderTest',
	$statics : {
		CLASSPATH : "fake.Classpath"	
	},
	$prototype : {
		testFailsIfInvalidArguments : function () {
			this.__assertInstanciationFailsForArgs();
			this.__assertInstanciationFailsForArgs(this.CLASSPATH);
			this.__assertInstanciationFailsForArgs(this.CLASSPATH, []);
		},

		testGeneratedClasspathsAreUnique : function () {
			var classpath = this.CLASSPATH, methods = {};
			var mockedDef1 = new mockato.mock.MockedClassDefinitionBuilder(classpath, methods).build();
			var mockedDef2 = new mockato.mock.MockedClassDefinitionBuilder(classpath, methods).build();
			this.assertNotEquals(mockedDef2.$classpath, mockedDef1.$classpath);
		},

		testClassRefHasMethods : function () {
			var classpath = this.CLASSPATH, 
				methods = {'myMethod' : true};
			var mockedDef = new mockato.mock.MockedClassDefinitionBuilder(classpath, methods).build();
			this.assertTrue(aria.utils.Type.isFunction(mockedDef.$prototype['myMethod']));
		},

		__assertInstanciationFailsForArgs : function (classpath, methods) {
			var hasFailed = false;
			try {
				new mockato.mock.MockedClassDefinitionBuilder(classpath, methods);
			} catch (expected) {
				hasFailed = true;
			}
			this.assertTrue(hasFailed);
		}
	}
});