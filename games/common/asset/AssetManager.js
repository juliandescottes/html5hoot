Aria.classDefinition({
	$classpath : 'games.common.asset.AssetManager',
	$extends : 'games.common.BaseObject',
	$dependencies : [
		'games.common.asset.ImageDownloader',
		'games.common.assert.Assert'
	], 
	$events : {
		'assetLoaded' : 'assetLoaded'
	},
	$statics : {
		getDefaultImplementation : function () {
			var imageDownloader = new games.common.asset.ImageDownloader();
			return new games.common.asset.AssetManager(imageDownloader);
		}	
	},
	$constructor : function (imageDownloader) {
		this.$BaseObject.constructor.call(this);
		this.__downloadQueue = [];
		this.__cache = {};
		this.__successCount = this.__errorCount = 0;
		this.__imageDownloader = this.$Assert.isInstanceOf(imageDownloader, this.$ImageDownloader);
		this.__rootFolder = "";
	},
	$prototype : {
		getAsset : function (url) {
			url = this.__getCompleteUrl(url);
			if (!this.__cache[url]) {
				this.__cache[url] = this.__downloadImage(url, function () {});
			}
			return this.__cache[url];
		},
		queueDownload : function (url) {
			this.__downloadQueue.push(this.__getCompleteUrl(url));
		},
		queueDownloads : function (urls) {
			for (var i = 0 ; i < urls.length ; i++) {
				this.queueDownload(urls[i]);
			}
		},
		download : function (callback) {
			if (this.__downloadQueue.length === 0) {
		        this.$callback(callback);
		    }
		    	    
		    for (var i = 0; i < this.__downloadQueue.length; i++) {
		   		var url = this.__downloadQueue[i];
		    	this.__cache[url] = this.__downloadImage(url, callback);
		    	//window.setTimeout(this.getDowloadMethod(i, callback), 500*0);
		    }
		},

		getDowloadMethod : function (i, callback) {
	   		var url = this.__downloadQueue[i];
	   		var oSelf = this;
	    	return (function () {
	    		oSelf.__cache[url] = oSelf.__downloadImage(url, callback);
	    	});
		},

		setRootFolder : function (rootFolder) {
			this.__rootFolder = rootFolder;
		},

		__onDownloadSuccess : function (res, callback) {
            this.__successCount += 1;
            if (this.__isFinished()) {
        		this.$callback(callback);
            }
            this.$raiseEvent({name : 'assetLoaded', successCount : this.__successCount, total : this.__downloadQueue.length});
		},

		__onDownloadError : function (res, callback) {
			this.__errorCount += 1;
            if (this.__isFinished()) {
        		this.$callback(callback);
            }
		},

		__downloadImage : function (url, callback) {
			return this.__imageDownloader.download(url, {fn : this.__onDownloadSuccess, scope : this, args : callback}, {fn : this.__onDownloadError, scope : this, args : callback});
		},

		__isFinished : function () {
		    return (this.__downloadQueue.length == this.__successCount + this.__errorCount);
		},

		__getCompleteUrl : function (url) {
			return this.__rootFolder + url;
		}
	}
});