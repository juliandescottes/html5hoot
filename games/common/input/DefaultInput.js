Aria.classDefinition({
	$classpath : 'games.common.input.DefaultInput',
	$implements : ['games.common.input.Input'],
	$extends : 'games.common.BaseObject',
	$constructor : function (code) {
		this.$BaseObject.constructor.call(this);
		this.__code = code;

		this.__duration = 0;
		this.__isCompleted = false;
	},
	$prototype :  {
		getCode : function () {
			return this.__code;
		},
		
		complete : function () {
			this.update = function () {};
			this.__isCompleted = true;
		},
		
		isCompleted : function () {
			return this.__isCompleted;
		},

		getDuration : function () {
			return this.__duration;
		},

		update : function (deltaTime) {
			this.__duration += deltaTime;
		}
	}
})