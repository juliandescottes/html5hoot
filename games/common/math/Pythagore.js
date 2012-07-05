Aria.classDefinition({
	$classpath : 'games.common.math.Pythagore',
	$extends : 'games.common.BaseObject',
	$constructor : function () {
		this.$BaseObject.constructor.call(this);
	},
	$statics : {
		calculateDiag : function (a, b) {
			return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
		} 
	}
});