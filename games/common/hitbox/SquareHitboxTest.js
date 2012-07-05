Aria.testDefinition({
	$classpath : 'games.common.hitbox.SquareHitboxTest',
	$prototype : {
		testIdenticalHitboxesIntersect : function () {
			var hitbox1 = new games.common.hitbox.SquareHitbox(10, 10, 5, 5);
			var hitbox2 = new games.common.hitbox.SquareHitbox(10, 10, 5, 5);
			this.assertTrue(hitbox1.intersects(hitbox2));
		},
		testOverlappingHitboxesIntersect : function () {
			var hitbox1 = new games.common.hitbox.SquareHitbox(10, 10, 10, 10);
			var hitbox2 = new games.common.hitbox.SquareHitbox(15, 15, 10, 10);
			this.assertTrue(hitbox1.intersects(hitbox2));
		},
		testNestedHitboxesIntersect : function () {
			var hitbox1 = new games.common.hitbox.SquareHitbox(10, 10, 20, 20);
			var hitbox2 = new games.common.hitbox.SquareHitbox(15, 15, 5, 5);
			this.assertTrue(hitbox1.intersects(hitbox2));
		},
		testDisjoinedHitboxesDontIntersect : function () {
			var hitbox1 = new games.common.hitbox.SquareHitbox(10, 10, 5, 5);
			var hitbox2 = new games.common.hitbox.SquareHitbox(20, 20, 5, 5);
			this.assertFalse(hitbox1.intersects(hitbox2));
		}
	}
});