Aria.testDefinition({
	$classpath : 'mockato.when.WhenTest',
	$dependencies : ['mockato.ClassA', 'mockato.mock.Mock', 'mockato.Matchers'],
	$prototype : {
		setUp: function () {
			this.__mock = new mockato.mock.Mock('mockato.ClassA');
			this.__when = new mockato.when.When(this.__mock);	
		},

		testWhenThenReturnForExpectedArgument : function () {
			this.__when.basicMethod("expected").thenReturn("expectedReturn");
			this.assertEquals("expectedReturn", this.__mock.basicMethod("expected"));
		},
		
		testWhenThenReturnForDifferentArgument : function () {
			this.__when.basicMethod("expected").thenReturn("expectedReturn");
			this.assertNotEquals("expectedReturn", this.__mock.basicMethod("unexpected"));
		},

		testWhenThenThrowForExpectedArgument : function () {
			this.__when.basicMethod("illegal").thenThrow("illegal argument");
			var hasFailed = false;
			try {
				this.__mock.basicMethod("illegal");
			} catch (expected) {
				hasFailed = true;
			}
			this.assertTrue(hasFailed, 'basicMethod should have thrown an exception here');
		},
		
		testWhenThenThrowForDifferentArgument : function () {
			this.__when.basicMethod("illegal").thenThrow("illegal argument");
			this.__mock.basicMethod("other_argument");
		},

		testWhenWithMatchers : function () {
			this.__when.basicMethod(mockato.Matchers.ANY).thenReturn("returnThisAnyway");
			this.assertEquals("returnThisAnyway", this.__mock.basicMethod("expected"));
			this.assertEquals("returnThisAnyway", this.__mock.basicMethod({}));
			this.assertEquals("returnThisAnyway", this.__mock.basicMethod("someOther string !"));
		}
	}
});