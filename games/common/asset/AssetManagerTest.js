Aria.testDefinition({
	$classpath : 'games.common.asset.AssetManagerTest',
	$dependencies : [
		'games.common.asset.ImageDownloader',
		'mockato.Mockato',
		'mockato.Matchers'
	],
	$statics : {
		IMAGE_URL : 'url'
	},
	$prototype : {
		testCallsCallbackAndPopulatesCache : function () {
			var imageDownloader = mockato.Mockato.mock('games.common.asset.ImageDownloader');
			var imageObject = {url : this.IMAGE_URL};
			var ANY = mockato.Matchers.ANY;
			mockato.Mockato.when(imageDownloader).download(ANY, ANY, ANY).thenAnswer(function(url, success, error) {
				aria.core.JsObject.prototype.$callback(success);
				return imageObject;
			});

			var manager = new games.common.asset.AssetManager(imageDownloader);
			manager.queueDownload(this.IMAGE_URL);
			var callbackCalled = false;
			manager.download({fn : function () {callbackCalled = true}});
			
			this.assertTrue(callbackCalled); 
			this.assertEquals(imageObject, manager.getAsset(this.IMAGE_URL));
		}
	}
});