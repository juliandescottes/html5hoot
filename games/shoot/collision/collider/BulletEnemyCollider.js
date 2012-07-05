Aria.classDefinition({
	$classpath : 'games.shoot.collision.collider.BulletEnemyCollider',
	$extends : 'games.common.BaseObject',
	$dependencies : ['games.shoot.utils.GameType'], $implements : ['games.common.collision.Collider'],
	$constructor : function () {
		this.$BaseObject.constructor.call(this);
	},
	$prototype : {
		collide : function (bullet, enemy) {
			if (this.$GameType.isPhysicalEnemy(bullet)) {
				return this.collide(enemy, bullet);
			}
			bullet.destroy();
			enemy.hit(1);
		}
	}
});