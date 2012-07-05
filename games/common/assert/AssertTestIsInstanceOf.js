Aria.testDefinition({
			$classpath : 'games.common.assert.AssertTestIsInstanceOf',
			$constructor : function () {
				this.$Assert = games.common.assert.Assert;
			},
			$prototype : {
				testIsInstanceOfIsValidForObjectOfTheActualClasspath : function() {
					this.checkObjectIsReturned(new aria.core.JsObject(),
							'aria.core.JsObject');
				},
				
				testIsInstanceOfIsValidForInheritingObject : function() {
					this.checkObjectIsReturned(this,
							'aria.core.JsObject');
				},
				
				// tests to write : 
				// - class implementing classpath
				
				testIsInstanceOfThrowsError : function () {
					this.checkErrorIsThrown({}, 'aria.core.JsObject');
					this.checkErrorIsThrown(null, 'aria.core.JsObject');
					this.checkErrorIsThrown(undefined, 'aria.core.JsObject');
					this.checkErrorIsThrown(new aria.core.JsObject(), 'aria.DomEvent');
				},
				
				checkObjectIsReturned : function(object, classpath) {
					this.assertEquals(object, this.$Assert.isInstanceOf(object,
									classpath, this.DEFAULT_MESSAGE));
				},

				checkErrorIsThrown : function(object, classpath) {
					var errorThrown = false;
					try {
						this.$Assert.isInstanceOf(object, classpath,
								this.DEFAULT_MESSAGE);
					} catch (e) {
						errorThrown = true;
					}
					this.assertTrue(errorThrown,
							'isInstanceOf was expected to throwan error for object : '
									+ object + ', against classpath : '
									+ classpath);
				}
			}
		})