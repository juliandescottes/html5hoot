Aria.classDefinition({
	$classpath : 'games.shoot.utils.Fullscreen',
	$extends : 'games.common.BaseObject',
	$statics : {
		toggleFullscreen : function () {
			if (this.isFullscreenOn()) {
				this.disableFullscreen();
			} else {
				this.enableFullscreen();
			}
		},

		isFullscreenOn : function () {
			return document.mozFullScreen || document.webkitIsFullScreen;
		},

		disableFullscreen : function () {
			try {
				this.__disableFullscreen();
			} catch (e) {
				console.log('Fullscreen exception : ' + e);
			}
		},

		__disableFullscreen : function () {
			if (document.webkitCancelFullScreen) {
				document.webkitCancelFullScreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			}
		},

		enableFullscreen : function () {
			try {
				this.__enableFullscreenForDiv(this.__getFullscreenContainer());
			} catch (e) {
				console.log('Fullscreen exception : ' + e);
			}
		},

		__enableFullscreenForDiv : function (div) {
			if (div.webkitRequestFullScreen) {
					div.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
				} else if (div.mozRequestFullScreen) {
					div.mozRequestFullScreen();
				}
		},

		__getFullscreenContainer : function () {
			return document.getElementById('gameContainer');
		}
	}
});