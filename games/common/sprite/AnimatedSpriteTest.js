Aria.testDefinition({
	$classpath : 'games.common.sprite.AnimatedSpriteTest',
	$dependencies : [
		'mockato.Mockato',
		'games.common.sprite.Sprite'
	],
	$statics : {
		DURATION : 50,
		X : 0,
		Y : 0
	},
	$prototype : {
		setup : function () {
			this.__sprite1 = mockato.Mockato.mock('games.common.sprite.Sprite');
			this.__sprite2 = mockato.Mockato.mock('games.common.sprite.Sprite');
			this.__sprite3 = mockato.Mockato.mock('games.common.sprite.Sprite');

			this.__context = {};

			this.__sprites = [this.__sprite1, this.__sprite2, this.__sprite3];

			this.__animatedSprite = new games.common.sprite.AnimatedSprite(this.__sprites, this.DURATION);	
		},
		testFirstSpriteIsDrawnAtInstant0 : function () {
			this.__updateThenDraw(0);
			this.__assertExpectedSpriteWasDrawn(this.__sprite1);
		},
		testFirstSpriteIsDrawnAtInstant30 : function () {
			this.__updateThenDraw(30);
			this.__assertExpectedSpriteWasDrawn(this.__sprite1);
		},
		testSecondSpriteIsDrawnAtInstant60 : function () {
			this.__updateThenDraw(60);
			this.__assertExpectedSpriteWasDrawn(this.__sprite2);
		},
		testThirdSpriteIsDrawnAtInstant120 : function () {
			this.__updateThenDraw(120);
			this.__assertExpectedSpriteWasDrawn(this.__sprite3);
		},
		testFirstSpriteIsDrawnAtInstant160 : function () {
			this.__updateThenDraw(160);
			this.__assertExpectedSpriteWasDrawn(this.__sprite1);
		},

		__updateThenDraw : function (deltaTime) {
			this.__animatedSprite.update(deltaTime);
			this.__animatedSprite.draw(this.X, this.Y, this.__context);
		},

		__assertExpectedSpriteWasDrawn : function (sprite) {
			for (var i = 0 ; i < this.__sprites.length ; i++) {
				var stub = mockato.Mockato.verify(this.__sprites[i]).draw(this.X, this.Y, this.__context);
				if (sprite == this.__sprites[i]) {
					stub.atLeastOnce();
				} else {
					stub.never();
				}
			}
		}
	}
});