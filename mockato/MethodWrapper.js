Aria.classDefinition({
	$classpath : 'mockato.MethodWrapper',
	$extends : 'games.common.BaseObject',
	$constructor : function (methodName, mock, args) {
		this.$BaseObject.constructor.call(this);

		this.__args = args;
		this.__mock = mock;
		this.__methodName = methodName;
	}
});