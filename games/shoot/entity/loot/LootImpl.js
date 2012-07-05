Aria.classDefinition({
	$classpath : 'games.shoot.entity.loot.LootImpl',
	$extends : 'games.shoot.entity.PositionedEntity',
	$dependencies : [
		'games.common.hitbox.SquareHitbox',
		'games.common.sprite.BlinkingSprite',
		'games.shoot.utils.Environment',
		'games.common.math.Random',
		'games.shoot.utils.Speed',
		'games.common.math.GameMath'
	], 
	$implements : [
		'games.shoot.entity.loot.Loot'
	],
	$constructor : function (x, y, initialSpeed) {
		this.$PositionedEntity.constructor.call(this, x, y);
		this.__totalTime = 0;

		var randomFactor = 0.5 + (Math.random()/2);
		this.__initialSpeed = randomFactor * (typeof initialSpeed != "undefined" ? initialSpeed : this.INITIAL_SPEED);

		this.__initializeForces();
		this.__blinkingSprite = this._createSprite();

	},
	$prototype : {
		update : function (deltaTime) {
			this.__totalTime += deltaTime;
			
			this.__updatePosition(deltaTime);
			this.__updateSprite(deltaTime);

			if (this.__isOutOfBoard() || this.__hasExpired()) {
				this.destroy();
			}
		},

		draw : function (context) {
			this.__blinkingSprite.draw(this.getX(), this.getY(), context);
			this.getHitbox().draw(context);
		},

		getHitbox : function () {
			// twice as big for easier pickup
			var size = this.SIZE * 2;
			return new this.$SquareHitbox(this.getX() - size/2, this.getY() - size/2, size, size);
		},

		getValue : function () {
			return this.VALUE;			
		},

		setAttractionForce : function (force) {
			this.__attractionForce = force;
		},

		__initializeForces : function () {
			var randomRad = Math.random()*2*Math.PI;
			this.__initialForce = {
				x : this.$Random.polarize(this.__initialSpeed * Math.cos(randomRad)), 
				y : this.$Random.polarize(this.__initialSpeed * Math.sin(randomRad)),
				ratio : randomRad
			};
			this.__attractionForce = {x : 0, y : 0};
		},

		_createSprite : function () {
			// Abstract, to override
			throw new Error('_createSprite is abstract')
		},

		__isOutOfBoard : function () {
			return this.__y > this.$Environment.BOARD.HEIGHT + this.SIZE;
		},

		__hasExpired : function () {
			return this.EXPIRATION_TIME < this.__totalTime;
		},

		__updateForces : function (deltaTime) {
			var forceReduction = 3*deltaTime/1000;
			var ratio = this.__initialForce.ratio;
			this.__initialForce.x = this.$GameMath.normalizeFromToWithDelta(this.__initialForce.x, 0, forceReduction * Math.cos(ratio));
			this.__initialForce.y = this.$GameMath.normalizeFromToWithDelta(this.__initialForce.y, 0, forceReduction * Math.sin(ratio));

			// Collisions are resolved before update, traction is computed before this and can be discarded now in preparation for the next loop
			this.__attractionForce = {x : 0, y : 0};
		},

		__updatePosition : function (deltaTime) {
			this.__x += (this.__initialForce.x + this.__attractionForce.x + this.SPEED.X) * deltaTime;
			this.__y += (this.__initialForce.y + this.__attractionForce.y + this.SPEED.Y) * deltaTime;
			this.__updateForces(deltaTime);
		},

		__updateSprite : function (deltaTime) {
			this.__blinkingSprite.update(deltaTime);
			if (this.__hasAlmostExpired()) {
				this.__blinkingSprite.setBlinking(true);
			}
		},

		__hasAlmostExpired : function () {
			return this.EXPIRATION_TIME/1.5 < this.__totalTime;
		}
	}
});