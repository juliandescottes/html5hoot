Aria.classDefinition({
	$classpath : 'games.common.hitbox.SquareHitbox',
	$dependencies : ['games.common.entity.Square'],
	$constructor : function (x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	},
	$prototype : {
		intersects : function (hitbox) {
			//this.$Assert.isInstanceOf(hitbox, 'games.common.hitbox.SquareHitbox');
			return this.__intersectsOnY(hitbox) && this.__intersectsOnX(hitbox);
		},

		draw : (window.location.href.toLowerCase().indexOf('hitbox') != -1) ? 
			function (context) {
				games.common.entity.Square.prototype.draw.call(this, '#faa', context);
			} : function () {},

		__intersectsOnX : function (hitbox) {
			if (this.x <= hitbox.x && this.x + this.width >= hitbox.x) {
				return true;
			}
			if (this.x >= hitbox.x && this.x <= hitbox.x + hitbox.width) {
				return true;
			}
			return false;
		},

		__intersectsOnY : function (hitbox) {
			if (this.y <= hitbox.y && this.y + this.height >= hitbox.y) {
				return true;
			}
			if (this.y >= hitbox.y && this.y <= hitbox.y + hitbox.height) {
				return true;
			}
			return false;
		}
	}
});