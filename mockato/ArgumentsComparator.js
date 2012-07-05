Aria.classDefinition({
	$classpath : 'mockato.ArgumentsComparator',
	$dependencies : ['mockato.Matchers'],
	$statics : {
		compare : function (expected, actual) {
			if (expected.length && expected[0] == mockato.Matchers.ANYALL) {
				return true;
			}
			
			if (expected.length == actual.length) {
				return this.__compareSameSizeArgumentsLists(expected, actual);	
			} else {
				return false
			}
		},

		__compareSameSizeArgumentsLists : function (expected, actual) {
			for (var i = 0 ; i < expected.length ; i++) {
				if (this.__argumentsAreDifferent(expected[i], actual[i])) {
					return false;
				}
			}
			return true;
		},

		__argumentsAreDifferent : function (expected, actual) {
			if (expected == mockato.Matchers.ANY) {
				return false;
			} else {
				return expected != actual;	
			}			
		}
	},
	$constructor : function () {}
})