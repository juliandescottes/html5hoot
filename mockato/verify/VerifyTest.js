Aria.testDefinition({
	$classpath : 'mockato.verify.VerifyTest',
	$dependencies : ['mockato.ClassA','mockato.mock.Mock'],
	$prototype : {
		setUp : function () {
			this.__mock = new mockato.mock.Mock('mockato.ClassA');
			this.__verify = new mockato.verify.Verify(this.__mock);
		},

		tearDown : function () {
			this.__mock.$dispose();	
		},

		testVerifyOnceIsOK : function () {
			this.__callBasicMethod(1);
			this.__verify.basicMethod().once();
		},

		testVerifyAtLeastIsOK : function () {
			this.__callBasicMethod(1);
			this.__verify.basicMethod().atLeastOnce();
			this.__callBasicMethod(1);
			this.__verify.basicMethod().atLeastOnce();
			this.__verify.basicMethod().atLeast(2);
		},

		testVerifyAtLeasrThrowsError : function () {
			this.__callBasicMethod(2);
			this.__assertCallbackThrowsError(function () {
					this.__verify.basicMethod().atLeast(3);	
				},
				'atMost(3) was expected to throw an error and fail the ongoing test'
			);
		},

		testVerifyAtMostIsOK : function () {
			this.__callBasicMethod(1);
			this.__verify.basicMethod().atMost(1);
			this.__verify.basicMethod().atMost(2);
			this.__callBasicMethod(1);
			this.__verify.basicMethod().atMost(2);
		},

		testVerifyAtMostThrowsError : function () {
			this.__callBasicMethod(3);
			this.__assertCallbackThrowsError(function () {
					this.__verify.basicMethod().atMost(2);	
				},
				'atMost(2) was expected to throw an error and fail the ongoing test'
			);
		},

		testVerifyOnceThrowsErrorIfCalledMore : function () {
			this.__callBasicMethod(2);

			this.__assertCallbackThrowsError(function () {
					this.__verify.basicMethod().once();	
				},
				'once was expected to throw an error and fail the ongoing test'
			);
		},


		testVerifyOnceThrowsErrorIfNotCalled : function () {
			this.__callBasicMethod(0);
			this.__assertCallbackThrowsError(function () {
					this.__verify.basicMethod().once();	
				},
				'once was expected to throw an error and fail the ongoing test'
			);
		},

		testVerifyOnceThrowsErrorForDifferentSignatures : function () {
			this.__mock.basicMethod("runtimeArgument");

			this.__assertCallbackThrowsError(function () {
					this.__verify.basicMethod("expectedArgument").once();	
				},
				'once was expected to throw an error and fail the ongoing test'
			);
		},

		__callBasicMethod : function (times) {
			for (var i = 0 ; i < times ; i++) {
				this.__mock.basicMethod();				
			}
		},

		__assertCallbackThrowsError : function (callback, errorMessage) {
			var hasThrown = false;
			try {
				// using this.$callback doesn't work here
				callback.call(this);
			} catch (expected) {
				hasThrown = true;
			}
			this.assertTrue(hasThrown, errorMessage);
		}
	}
});