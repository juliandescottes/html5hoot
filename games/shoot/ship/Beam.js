
Aria.classDefinition({
	$classpath : 'games.shoot.ship.Beam',
	$extends : 'games.common.entity.DestroyableEntity',
	$dependencies : [
		'games.common.hitbox.SquareHitbox',
		'games.common.sprite.SpritePattern',
		'games.common.sprite.AnimatedSpriteBuilder',
		'games.shoot.entity.engine.ConstantAccelerationEngine',
		'games.shoot.utils.Lol'
	],
	$implements : ['games.common.entity.PhysicalEntity'],
	$statics : {
		WIDTH : 60,
		HEIGHT : 30,
		MAX_SPEED : 0.8,
		ACCELERATION : 2
	},
	$constructor : function (x, y) {
		this.$DestroyableEntity.constructor.call(this);
		this.updateOrigin(x, y);

		var scale = this.$Lol.ICANHAZ ? 3 : 1;

		this.WIDTH = scale * this.WIDTH;		
		this.HALF_WIDTH = this.WIDTH / 2

		this.__y = this.__startY - this.HEIGHT;
		this.__released = false;
		
		this.__accelerationEngine = new this.$ConstantAccelerationEngine(this.ACCELERATION, this.MAX_SPEED);
		
		this.__bottomSprite = this.$AnimatedSpriteBuilder.buildFromUrlAndTransform(
			'beamBottomAnimatedSmall.png', 
			45, 80, 
			games.shoot.AssetManager, 
			{angle:-Math.PI / 2, scale : {x:scale, y:1}}
		);
		this.__bodySpritePattern = this.$SpritePattern.buildForSpriteUrl('shipBeam.png', games.shoot.AssetManager);
		this.__bodySpritePattern.rotate(-Math.PI / 2);
		this.__bodySpritePattern.scale(scale);
	},
	$prototype : {
		update : function (deltaTime) {
			this.__bottomSprite.update(deltaTime);
			this.__accelerationEngine.goUp(deltaTime);
			var speed = this.__accelerationEngine.getYSpeed();

			if (this.__released) {
				this.destroy();
			}

			if (this.__y - speed * deltaTime < - 100) {
				this.__y = this.HEIGHT + 5 + this.__y - speed * deltaTime;
			} else {
				this.__y = this.__y + speed * deltaTime
			}
		},

		release : function () {
			this.destroy();
		},

		updateOrigin : function (x, y) {
			this.__startY = y;
			this.__startX = x;				
		},

		draw : function (context) {
			this.__drawBody(context);
			this.__drawBottom(context);
			this.getHitbox().draw(context);
		},

		__drawBottom : function (context) {
			this.__bottomSprite.draw(this.__startX, this.__startY - this.HEIGHT + 5, context, 2);
		},

		__drawBody : function (context) {
			var startX = this.__startX,
				startY = this.__startY - this.HEIGHT;
			this.__bodySpritePattern.draw(startX, this.__y, startY, context);
		},

		collideWithHitbox : function (hitbox) {
			this.__y = hitbox.y + hitbox.height;
			this.__accelerationEngine.stopY();
		},

		getHitbox : function () {
			return new this.$SquareHitbox(this.__startX - this.HALF_WIDTH, this.__y, this.WIDTH,  this.__startY - this.__y);
		}
	}
});