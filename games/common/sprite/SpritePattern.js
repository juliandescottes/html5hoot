Aria.classDefinition({
	$classpath : 'games.common.sprite.SpritePattern',
	$extends : 'games.common.BaseObject',
	$dependencies : ['games.common.sprite.Sprite'],
	$statics : {
		buildForSpriteUrl : function (url, assetManager) {
			var image = assetManager.getAsset(url);
			var sprite = new games.common.sprite.Sprite(image);
			return new games.common.sprite.SpritePattern(sprite);
		}
	},
	$constructor : function (sprite) {
		this.$BaseObject.constructor.call(this);
		this.__sprite = sprite;
		this.__spriteHeight = 0;
	},
	$prototype : {
		draw : function (startX, startY, endY, context) {
			if (startY >= endY) return;
			var image = this.__sprite.getImage();
			var height = this.__spriteHeight || image.height,
				width = image.width;
			var offsetHeight = 0;
			while (offsetHeight + startY + height<= endY) {
				context.drawImage(
			        image, 
			        0, this.__spriteHeight ? image.height - this.__spriteHeight : 0,
			        width, image.height,
			        startX - width/2, offsetHeight + startY,
			        width, height
			    );
				offsetHeight += height - 1;
			}
			context.drawImage(
		        image, 
		        0, 0,
		        width, endY - (offsetHeight + startY),
		        startX - width/2, (offsetHeight + startY),
		        width, endY - (offsetHeight + startY)
		    );
		},

		scale : function (scale) {
			this.__sprite.scale(scale, scale);
		},

		rotate : function (angle) {
			this.__sprite.rotate(angle)
		},

		setSpriteHeight : function (height) {
			this.__spriteHeight = height;
		}
	}
});