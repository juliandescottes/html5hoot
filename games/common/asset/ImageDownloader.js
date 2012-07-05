Aria.classDefinition({
	$classpath : 'games.common.asset.ImageDownloader',
	$extends : 'games.common.BaseObject',
	$dependencies : ['aria.utils.Function'],
	$constructor : function () {
		this.$BaseObject.constructor.call(this);
	},
	$prototype : {
		download : function (url, onSuccess, onError) {
			var img = new Image();
	        img.addEventListener("load", this.__getWrappedCallback(onSuccess), false);
	        img.addEventListener("error", this.__getWrappedCallback(onError), false);
	        img.src = url;
	        return img;
		},

		__getWrappedCallback : function (callback) {
			return this.$Function.bind(function () {this.$callback(callback)}, this);
		}
	}
});