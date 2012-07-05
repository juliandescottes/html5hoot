Aria.classDefinition({
	$classpath : 'games.shoot.entity.Bullet',
	$implements : ['games.common.entity.PhysicalEntity'],
	$dependencies : [
		'games.common.hitbox.SquareHitbox',
		'games.shoot.utils.Environment'
	],
	$extends : 'games.common.entity.DestroyableEntity',
	$statics : {
		ANGLE : 0,
		SPEED : 0.1,
		RADIUS : 3,
		COLOR : "black",
		GROUPS : {
			PLAYER : 'BULLET.GROUPS:PLAYER',
			ENEMY : 'BULLET.GROUPS:ENEMY'
		}
	},
	$constructor : function (x, y) {
		this.$DestroyableEntity.constructor.call(this);
		this.__x = x;
		this.__y = y;
		
		this.__radialDistance = 0;

		this.__angle = this.ANGLE;
		this.__speed = this.SPEED;
		this.__radius = this.RADIUS;
		this.__color = this.COLOR;
		this.__group = null;

		this.__hitbox = new this.$SquareHitbox(
			this.__x - this.__radius, 
			this.__y - this.__radius, 
			2 * this.__radius, 
			2 * this.__radius
		);
	},
	$prototype : {
		update : function (time) {
			this.__radialDistance = time * this.__speed;
			this.__x += this.__radialDistance * Math.cos(this.__angle);
			this.__y += this.__radialDistance * Math.sin(this.__angle);
			this.__updateHitbox();
 			if (this.__isOutOfBoardLimits()) {
				this.destroy();
			}
		},

		draw : function (context) {
			context.beginPath();
			context.strokeStyle = this.__color;
			context.arc(this.__x, this.__y, this.__radius, 0, Math.PI*2, false);
			context.stroke();
			context.closePath();
			this.getHitbox().draw(context);
		},

		setAngle : function (angle) {
			this.__angle = angle;
		},

		setSpeed : function (speed) {
			this.__speed = speed;
		},

		setRadius : function (radius) {
			this.__radius = radius;
			this.__updateHitbox();
		},

		setColor : function (color) {
			this.__color = color;
		},

		setGroup : function (group) {
			this.__group = group;
		},

		isPlayerBullet : function () {
			return this.__group == this.GROUPS.PLAYER;
		},

		isEnemyBullet : function () {
			return this.__group == this.GROUPS.ENEMY;
		},

		getHitbox : function () {
			return this.__hitbox;
		},

		__updateHitbox : function () {
			this.__hitbox.x = this.__x - this.__radius;
			this.__hitbox.y = this.__y - this.__radius;
			this.__hitbox.height = this.__hitbox.width = 2 * this.__radius;
		},

		__isOutOfBoardLimits : function () {
			var isOutVertically = this.__y < -10 || this.__y > this.$Environment.BOARD.HEIGHT + 10;
			var isOutHorizontally = this.__x < -10 || this.__x > this.$Environment.BOARD.WIDTH + 10; 
			return  isOutHorizontally || isOutVertically;	
		}
	}
});