Aria.testDefinition({
	$classpath : 'games.common.assert.AssertTest',
	$constructor : function() {
		this.$Assert = games.common.assert.Assert;
	},
	$statics : {
		DEFAULT_ERROR_MESSAGE : 'error message',
		SOME_INTEGER : 42,
		SOME_STRING : 'That\'s what she said',
		SOME_OBJECT : {
			a : 1
		},
		SOME_ARRAY : [1, 2, "a", "b"]
	},
	$prototype : {
		testAssertReturnsObjectWhenConditionIsOK : function() {
			var aJsObject = new aria.core.JsObject();
			var assertedObject = this.$Assert.assert(true, aJsObject,
					this.DEFAULT_ERROR_MESSAGE);
			this.assertEqualsWithDefaultLog(aJsObject, assertedObject);
		},

		testAssertThrowsExceptionWhenConditionNotOk : function() {
			this.checkAssertThrowsErrorForCondition(false);
			this.checkAssertThrowsErrorForCondition();
			this.checkAssertThrowsErrorForCondition(0);
			this.checkAssertThrowsErrorForCondition(null);
			this.checkAssertThrowsErrorForCondition(this.SOME_INTEGER);
			this.checkAssertThrowsErrorForCondition(this.SOME_OBJECT);
			this.checkAssertThrowsErrorForCondition(this.SOME_ARRAY);
		},

		checkAssertThrowsErrorForCondition : function(condition) {
			var errorThrown = false;
			try {
				this.$Assert.assert(condition, {},	this.DEFAULT_ERROR_MESSAGE)
			} catch (e) {
				errorThrown = true;
			}
			this.assertTrue(errorThrown, "assert expected to throw an error here");
		},

		assertEqualsWithDefaultLog : function(expected, actual) {
			this.assertEquals(expected, actual, "Expected : " + expected + ", received : " + actual);
		}
	}
});