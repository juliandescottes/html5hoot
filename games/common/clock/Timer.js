Aria.classDefinition({
	$classpath : 'games.common.clock.Timer',
	$constructor : function(maxDelta) {
	    this.__gameTime = 0;
	    this.__maxDeltaTimeAllowed = maxDelta;
	    this.__previousTimestamp = this.__currentTimestamp = 0;
	}, 
	$prototype : {
		getDelta : function () {
		    return this.__deltaTime;
		},
		
		getTotalGameTime : function () {
			return this.__gameTime;
		},
		
		update : function () {
			this.__updateTimestamps(Date.now());
			this.__deltaTime = this.__calculateDelta();
		    this.__gameTime += this.__deltaTime;
		},
		
		__updateTimestamps : function (currentTime) {
			this.__previousTimestamp = this.__currentTimestamp;
			this.__currentTimestamp = currentTime;
		},
		
		__calculateDelta : function () {
			var deltaTime = (this.__currentTimestamp - this.__previousTimestamp);
		    return Math.min(deltaTime, this.__maxDeltaTimeAllowed);
		}
	}
});