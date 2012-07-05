Aria.classDefinition({
	$classpath : 'games.shoot.entity.Explosion',
	$extends : 'games.common.entity.DestroyableEntity',
	$dependencies : [
		'games.common.animation.Animation',
	], $implements : ['games.common.entity.Entity'],
	$constructor : function (animation, x, y) {
		this.$DestroyableEntity.constructor.call(this);
		this.__animation = animation;
		this.__x = x;
		this.__y = y;
	},
	$prototype : {
		update : function (deltaTimer) {
			this.__animation.update(deltaTimer);
		    if (this.__animation.isFinished()) {
		        this.destroy();
		    }
		},

		draw : function (context) {
		    this.__animation.draw(context, this.__x, this.__y);
		}
	}
});