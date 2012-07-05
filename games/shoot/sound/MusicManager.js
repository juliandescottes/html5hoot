Aria.classDefinition({
	$classpath : 'games.shoot.sound.MusicManager',
	$extends : 'games.common.BaseObject',
	$dependencies : [
		'aria.utils.Event'
	],
	$constructor : function () {
		buzz.defaults.autoplay = true;
		buzz.defaults.loop = true;
	},
	$statics : {
		currentTrack : null,
		trackIndex : -1,
		urlPrefix : 'resources/sounds/', 
		tracks : [
			"machine.ogg",
			"theme.ogg",
			"bubbling.ogg"
		],

		playNext : function () {
			if (this.currentTrack) {
				this.currentTrack.unloop().stop();
			}
			var trackUrl = this.__getNextTrackUrl();
			if (trackUrl) {
				document.getElementById("playMusicButton").classList.add('activated');
				this.currentTrack = new buzz.sound(this.urlPrefix + trackUrl, {
					preload : true,
					autoplay : true,
					loop : true
				});
			} else {
				document.getElementById("playMusicButton").classList.remove('activated');
				this.trackIndex = -1;
				this.currentTrack = null;
			}
		},

		__getNextTrackUrl : function () {
			return this.tracks[++this.trackIndex];
		}
	}
});