Aria.classDefinition({
	$classpath : 'games.common.math.Random',
	$statics : {
		nextInt : function (max) {
			return Math.floor(Math.random()*max);
		},

		nextModulo : function (base) {
			return games.common.math.Random.nextInt(base) % base;
		},

		nextBoolean : function () {
			return !!games.common.math.Random.nextInt(2);
		},

		polarize : function (base) {
			return games.common.math.Random.nextBoolean() ? base : -1 * base;
		}
	}
})