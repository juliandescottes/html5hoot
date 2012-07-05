Aria.classDefinition({
	$classpath : 'games.shoot.ship.Magnet',
	$extends : 'games.common.entity.DestroyableEntity',
	$dependencies : [
		'games.common.hitbox.SquareHitbox',
		'games.shoot.utils.Speed',
		'games.common.math.Pythagore'
	], 
	$implements : ['games.common.entity.PhysicalEntity'],
	$constructor : function (radius) {
		this.$DestroyableEntity.constructor.call(this);
		this.__radius = radius;
		this.setXY(0, 0);
	},
	$prototype : {
		setXY : function (x, y) {
			this.__x = x;
			this.__y = y;
		},
		getHitbox : function () {
			var radius = this.__radius;
			return new this.$SquareHitbox(this.__x - radius/2, this.__y - radius/2, radius, radius);
		},

		getX : function () {
			return this.__x;
		},

		getY : function () {
			return this.__y;
		},

		getRadius : function () {
			return this.__radius;			
		},

		tractEntity : function (tractable) {
			var x = this.getX(), y = this.getY();
			var distance = this.$Pythagore.calculateDiag(tractable.getX() - x, tractable.getY() - y);
			var distanceRatio = 1 - (distance/this.getRadius());
			var attractionForce = this.$Speed.getSpeedXYForLineTrajectory(
				tractable.getX(), tractable.getY(),
				x, y,
				0.25 + distanceRatio * 0.15
			);
			tractable.setAttractionForce(attractionForce);
		}
	}
});