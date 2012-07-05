Aria.classDefinition({
	$classpath : 'games.common.BaseTest',
	$extends : 'aria.jsunit.TestCase',
	$constructor : function () {
		this.___init()
		this.$TestCase.constructor.call(this);
		games.common.BaseObject.call(this);
	},
	$prototype : {
		___init : function () {
			for (var i in games.common.BaseObject.prototype) {
				if (games.common.BaseObject.prototype.hasOwnProperty(i)) {
					games.common.BaseTest.prototype[i] = games.common.BaseObject.prototype[i];
				}
			}
			//games.common.BaseTest.prototype.___init = function () {};
		}
	}
});