Aria.classDefinition({
	$classpath : 'games.shoot.ShootLoader',
	$extends : 'games.common.BaseObject',
	$dependencies : [
		'games.shoot.controller.loading.LoadingController', 
		'games.common.asset.AssetManager',
		'games.shoot.sound.MusicManager',
		'games.shoot.utils.Fullscreen',
		'games.shoot.utils.Environment',
		'aria.utils.Event',
		'games.shoot.controller.level.LevelController',
		'games.shoot.utils.Lol'
	],
	$constructor : function () {
		this.$BaseObject.constructor.call(this);
		
		this.createAllCanvas();
		games.shoot.AssetManager = this.$AssetManager.getDefaultImplementation();
		games.shoot.AssetManager.setRootFolder('resources/img/');

		this.__connectKeyboardEvents();

		var loadingController = new this.$LoadingController(games.shoot.AssetManager, this.__overlayCanvas.getContext('2d')); 
		loadingController.start();
		loadingController.$on({
			'complete' : {
				fn : this.__onLoadingControllerCompleted,
				scope : this
			}
		})
		//(new games.shoot.ShootController(gameCanvas.getContext('2d'), overlayCanvas.getContext('2d'))).downloadAssetsThenStart();
	},
	$prototype : {
		createAllCanvas : function () {
			var gameContainer = document.getElementById('gameContainer');
			var width = this.$Environment.BOARD.WIDTH;
			var height = this.$Environment.BOARD.HEIGHT; 
			var scale = this.$Environment.BOARD.SCALE;

			this.__gameCanvas = this.createScaledCanvasInWrapper(width, height, scale, gameContainer);
			this.__gameCanvas.getContext('2d').webkitImageSmoothingEnabled = false;
			
			this.__overlayCanvas = this.createScaledCanvasInWrapper(width, height, scale, gameContainer);
		},

		createScaledCanvasInWrapper : function (width, height, scale, parentNode) {
			var canvas = this.createScaledCanvas(width, height, scale);
			var container = this.createCanvasContainer();
			container.appendChild(canvas);
			parentNode.appendChild(container);
			return canvas;
		},

		createScaledCanvas : function (width, height, scale) {
			var canvas = document.createElement('canvas');
			canvas.width = width * scale;
			canvas.height = height * scale;
			canvas.getContext("2d").scale(scale,scale);	

			return canvas;
		},

		createCanvasContainer : function () {
			var wrapperDiv = document.createElement('div');
			wrapperDiv.className = "canvasContainer";
			return wrapperDiv;
		},

		__connectKeyboardEvents : function () {
			this.$Event.addListener(document, 'keyup', {fn : this.__onKeyUp, scope : this});
		},

		__onKeyUp : function (evt) {
			if (evt.keyCode == 70) this.$Fullscreen.toggleFullscreen();
			else if (evt.keyCode == 78) this.$MusicManager.playNext();
		},

		__onLoadingControllerCompleted : function () {
			(new this.$LevelController(this.__gameCanvas.getContext('2d'), this.__overlayCanvas.getContext('2d'))).start();
		}
	}
});