Aria.testDefinition({
	$classpath : 'mockato.MockatoTest',
	$dependencies : ['mockato.ClassA'],
	$statics : {
		EXPECTED_ARG : "expected_arg",
		ANOTHER_ARG : "another_arg",
		EXPECTED_RETURN_VALUE : "return_value"
	},
	$prototype : {
		testWhen : function () {
			var mock = mockato.Mockato.mock('mockato.ClassA');
			
			mockato.Mockato.when(mock).basicMethod(this.EXPECTED_ARG).thenReturn(this.EXPECTED_RETURN_VALUE);
			this.assertEquals(this.EXPECTED_RETURN_VALUE, mock.basicMethod(this.EXPECTED_ARG));
			this.assertNotEquals(this.EXPECTED_RETURN_VALUE, mock.basicMethod(this.ANOTHER_ARG));
		}
	} 
})