Aria.testDefinition({
	$classpath : 'games.common.math.GameMathTest',
	$prototype : {
		testNormalizeFromToWithDelta : function () {
			var gameMath = games.common.math.GameMath;
			this.assertEquals(50, gameMath.normalizeFromToWithDelta(0,100,50));
			this.assertEquals(100, gameMath.normalizeFromToWithDelta(0,100,250));
			this.assertEquals(100, gameMath.normalizeFromToWithDelta(95,100,50));
			this.assertEquals(50, gameMath.normalizeFromToWithDelta(0,100,-50)); 

			this.assertEquals(50, gameMath.normalizeFromToWithDelta(100,0,50));
			this.assertEquals(0, gameMath.normalizeFromToWithDelta(100,0,250));
			this.assertEquals(0, gameMath.normalizeFromToWithDelta(1,0,50));
			this.assertEquals(50, gameMath.normalizeFromToWithDelta(100,0,-50));

			this.assertEquals(50, gameMath.normalizeFromToWithDelta(50,50,25)); 
		},


		testNormalizeFromToWithDeltaWithNegatives : function () {
			var gameMath = games.common.math.GameMath;
			this.assertEquals(-50, gameMath.normalizeFromToWithDelta(0,-100,50));
			this.assertEquals(-50, gameMath.normalizeFromToWithDelta(-100,0,50));
			
		}
	}
});