Aria.classDefinition({
	$classpath:'mockato.ClassAChild',
	$extends : 'mockato.ClassA',
	$statics : {
		RETURN_VALUE : "FOO"	
	},
	$constructor : function (classpath) {
		this.$ClassA.constructor.call(this);
	},
	$prototype : {
		childMethod : function () {
			return this.RETURN_VALUE;
		}
	}
});