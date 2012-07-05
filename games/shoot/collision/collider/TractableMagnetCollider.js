Aria.classDefinition({
	$classpath : 'games.shoot.collision.collider.TractableMagnetCollider',
	$extends : 'games.common.BaseObject',
	$constructor : function () {
		this.$BaseObject.constructor.call(this);
	},
	$prototype : {
		collide : function (tractable, magnet) {
			if (magnet.$Magnet) {
				magnet.tractEntity(tractable);
			} else {
				return this.collide(magnet, tractable);
			}
		}		
	}
});