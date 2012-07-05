Aria.classDefinition({
	$classpath : 'mockato.Mockato',
	$dependencies : ['mockato.mock.Mock', 'mockato.when.When', 'mockato.verify.Verify'],
	$statics : {
		mock : function (classpath) {
			return new mockato.mock.Mock(classpath);
		},
		when : function (mock) {
			return new mockato.when.When(mock);
		},
		verify : function (mock) {
			return new mockato.verify.Verify(mock);
		}
	}
})