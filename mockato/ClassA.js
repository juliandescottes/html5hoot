Aria.classDefinition({
	$classpath:'mockato.ClassA',
	$extends : 'games.common.BaseObject',
	$statics : {
		RETURN_VALUE : "FOO"	
	},
	$constructor : function (classpath) {
		this.$BaseObject.constructor.call(this);
	},
	$prototype : {
		basicMethod : function () {return this.RETURN_VALUE},
		methodThrowingError : function () {
			throw new Error("some error");
		}
	}
});