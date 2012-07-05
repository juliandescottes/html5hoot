Aria.classDefinition({
	$classpath : 'games.common.text.Text',
	$extends : 'games.common.entity.DestroyableEntity',
	$implements : ['games.common.sprite.Drawable'],
	$statics : {
		DEFAULT_SIZE : '24pt',
		DEFAULT_COLOR : '#fff',
		DEFAULT_FAMILY : 'Game',
		DEFAULT_TEXTALIGN : 'start',
		DEFAULT_TEXTBASELINE : 'top'
	},
	$constructor : function (family, size, color, textAlign, textBaseline) {
		this.$DestroyableEntity.constructor.call(this);
		this.__family = family || this.DEFAULT_FAMILY;
		this.__size = size || this.DEFAULT_SIZE;
		this.__color = color || this.DEFAULT_COLOR;
		this.__textAlign = textAlign || this.DEFAULT_TEXTALIGN;
		this.__textBaseline = textBaseline || this.DEFAULT_TEXTBASELINE;
	},
	$prototype : {
		draw : function (x, y, context) {
			context.textAlign = this.__textAlign;
			context.textBaseline = this.__textBaseline;
			context.font = this.__size + " " + this.__family;
			context.fillStyle = this.__color;
			context.fillText(this.__content, x, y);
		},

		setContent : function (content) {
			this.__content = content + "";
		},

		setSize : function (size) {
			this.__size = size;
		},

		setFamily : function (family) {
			this.__family = family;
		},

		setColor : function (color) {
			this.__color = color;
		},

		update : function () {},

		destroy : function () {
			this.__destroyed = true;
		},
		
		isDestroyed : function () {
			return this.__destroyed;
		},
	}
});