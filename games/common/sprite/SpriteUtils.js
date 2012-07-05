Aria.classDefinition({
	$classpath : 'games.common.sprite.SpriteUtils',
	$statics : {
		copySpriteAndRotate : function (image, angle) {
		    var size = games.common.sprite.SpriteUtils.__getSquareSizeForImage(image);
		    var canvas = games.common.sprite.SpriteUtils.createSquareCanvas(size);

		    var context = canvas.getContext('2d');
			context.save();
		    context.translate(size/2, size/2);
		    context.rotate(angle + Math.PI/2);
		    context.drawImage(image, -(image.width/2), -(image.height/2));
		    context.restore();
		    return canvas;
		},

		createSquareCanvas : function (size) {
		    return games.common.sprite.SpriteUtils.createCanvas(size, size);
		},

		createCanvas : function (width, height) {
			var canvas = document.createElement('canvas');
		    canvas.width = width;
		    canvas.height = height;
		    return canvas;
		},

		splitInFrames : function (image, frameWidth) {
			var frames = [];
			var widthOffset = 0;
			while (widthOffset < image.width) {
				frames.push(games.common.sprite.SpriteUtils.__getSubFrame(image, offset, frameWidth));
			}   
			return frames;
		},

		__getSquareSizeForImage : function (image) {
			return Math.max(image.width, image.height);
		},

		__getSubFrame : function (image, offsetStart, offsetWidth) {
			var canvas = this.__createCanvas(offsetWidth, image.height);
		    var context = canvas.getContext('2d');
			context.save();
			context.drawImage(image,
				offsetStart, 0,  // source from sheet
				offsetWidth, image.height,
				0, 0,
				offsetWidth, image.height
			);
		    context.restore();
		    return canvas;
		}
	}
});