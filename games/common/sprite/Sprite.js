Aria.classDefinition({
	$classpath : 'games.common.sprite.Sprite',
	$extends : 'games.common.BaseObject',
	$implements : ['games.common.sprite.Drawable'],
	$statics : {
		__cache : {},
		/**
		 * Move this to nyump, this is too cache specific
		 */ 
		buildForSpriteUrl : function (url, angle, assetManager) {
			if (games.common.sprite.Sprite.__cache[url + angle]) {
				return games.common.sprite.Sprite.__cache[url + angle];
			}
			var sprite = new games.common.sprite.Sprite(assetManager.getAsset(url));
			sprite.rotate(angle);
			games.common.sprite.Sprite.__cache[url + angle] = sprite;
			return sprite;
		}
	},
	$constructor : function (image) {
		this.$BaseObject.constructor.call(this);
		this.__image = image;
	},
	$prototype : {
		draw : function (x, y, context, scale) {
			scale = scale || 1;
			if (this.__image && x && y) {
				this.__drawAtXY(x, y, context, scale);
		    }
		},

		rotate : function (angle) {
			var size = Math.max(this.__image.height, this.__image.width);

		    var canvas = this.__createCanvas(size, size);
		    var context = canvas.getContext('2d');
			context.save();
		    context.translate(size/2, size/2);
		    context.rotate(angle + Math.PI/2);
		    context.drawImage(this.__image, -(this.__image.width/2), -(this.__image.height/2));
		    context.restore();
		    this.__image = canvas;
		},

		scale : function (scaleX, scaleY) {
			var sizeX =this.__image.width * scaleX;
			var sizeY = this.__image.height * scaleY;

		    var canvas = this.__createCanvas(Math.abs(sizeX), Math.abs(sizeY));
		    var context = canvas.getContext('2d');

			context.save();
		    context.translate(canvas.width/2, canvas.height/2);
			context.scale(scaleX, scaleY)
		    context.drawImage(this.__image, -this.__image.width/2, -this.__image.height/2);
		    context.restore();

		    this.__image = canvas;
		},

		getImage : function () {
			return this.__image;	
		},

		__drawAtXY : function (x, y, context, scale) {
			var width = this.__image.width,
				height = this.__image.height,
				image = this.__image;
			if (typeof scale == "number") {
				scale = {x : scale, y : scale};
			}

			x = x - (width * scale.x)/2;
	        y = y - (height * scale.y)/2;
	        context.drawImage(
		        image, 
		        0, 0,
		        width, height,
		        x, y,
		        width * scale.x, height * scale.y
		    );
		},

		__createCanvas : function (width, height) {
			var canvas = document.createElement('canvas');
		    canvas.width = width;
		    canvas.height = height;
		    return canvas;
		}
	}
});