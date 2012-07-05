Aria.classDefinition({
	$classpath : 'games.shoot.collision.collider.BeamEnemyCollider',
	$extends : 'games.common.BaseObject',
	$constructor : function () {
		this.$BaseObject.constructor.call(this);
	},
	$prototype : {
		collide : function (beam, enemy) {
			if (beam.$Beam) {
				beam.collideWithHitbox(enemy.getHitbox());
				enemy.__hits = enemy.__hits ? enemy.__hits + 1 : 1;
				if(enemy.__hits > 5) {
					enemy.destroy();
				}
			} else {
				return this.collide(enemy, beam);
			}
		}		
	}
});