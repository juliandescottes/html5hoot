Aria.classDefinition({
	$classpath : 'games.common.sprite.AnimatedSpriteBuilder',
	$extends : 'games.common.BaseObject',
	$dependencies : ['games.common.sprite.AnimatedSprite', 'games.common.sprite.Sprite'], $implements : [],
	$statics : {
		__cache : {},

		buildFromFramesheetUrlAndRotate : function (url, frameWidth, frameDuration, assetManager, angle) {
			var transform = {
				angle : angle,
				scale: {x : 1, y : 1}
			};
			var sprites = games.common.sprite.AnimatedSpriteBuilder.__getTransformedSprites(url, frameWidth, frameDuration, assetManager, transform);
			return new games.common.sprite.AnimatedSprite(sprites, frameDuration);
		},

		buildFromUrlAndTransform : function (url, frameWidth, frameDuration, assetManager, transform) {
			var sprites = games.common.sprite.AnimatedSpriteBuilder.__getTransformedSprites(url, frameWidth, frameDuration, assetManager, transform);
			return new games.common.sprite.AnimatedSprite(sprites, frameDuration);
		},

		__getTransformedSprites : function (url, frameWidth, frameDuration, assetManager, transform) {
			var key = url + transform.angle + "__" + transform.scale.x + "__" + transform.scale.y;
			var cache = games.common.sprite.AnimatedSpriteBuilder.__cache;
			if (cache[key]) {
				return cache[key];
			}
			var framesheet = assetManager.getAsset(url);
			var animatedSprite = new games.common.sprite.AnimatedSpriteBuilder(framesheet, frameWidth, frameDuration).build();
			if (transform.angle) {
				animatedSprite.rotate(transform.angle);
			}
			if (transform.scale && (transform.scale.x != 1 || transform.scale.y != 1)) {
				animatedSprite.scale(transform.scale.x, transform.scale.y);
			}
			cache[key] = animatedSprite.__sprites;
			return cache[key];
		}
	},
	$constructor : function (framesheet, frameWidth, frameDuration) {
		this.$BaseObject.constructor.call(this);
		this.__framesheet = framesheet;
		this.__frameWidth = frameWidth;
		this.__frameDuration = frameDuration;
	},
	$prototype : {
		build : function () {
			var sprites = [];
			var offset = 0;
			while (offset + this.__frameWidth <= this.__framesheet.width) {
				sprites.push(this.__getFrameAtOffset(offset));
				offset += this.__frameWidth;
			}
			return new this.$AnimatedSprite(sprites, this.__frameDuration);
		},

		__getFrameAtOffset : function (offsetStart) {
			var width = this.__frameWidth,
				height = this.__framesheet.height,
				image = this.__framesheet;
			
			var canvas = this.__createCanvas(width, height);
		    var context = canvas.getContext('2d');
			context.save();
			context.drawImage(image,
				offsetStart, 0,  // source from sheet
				width, height,
				0, 0,
				width, height
			);
		    context.restore();
		    return new this.$Sprite(canvas);
		},

		__createCanvas : function (width, height) {
			var canvas = document.createElement('canvas');
		    canvas.width = width;
		    canvas.height = height;
		    return canvas;
		}
	}
});