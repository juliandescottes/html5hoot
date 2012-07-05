Aria.classDefinition({
	$classpath : 'games.common.sprite.FrameSplitter',
	$extends : 'games.common.BaseObject',
	$dependencies : [], $implements : [],
	$constructor : function (image, frameWidth) {
		this.$BaseObject.constructor.call(this);
		this.__image = image;
		this.__frameWidth = frameWidth;
	},
	$prototype : {
		split : function () {
			var frames = [];
			var offset = 0;
			while (offset + this.__frameWidth <= this.__image.width) {
				frames.push(this.__getFrame(offset));
				offset += this.__frameWidth;
			}
			return frames;	
		},

		__getFrame : function (offsetStart) {
			var width = this.__frameWidth,
				height = image.height,
				image = this.__image;
			
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
		}
	}
});