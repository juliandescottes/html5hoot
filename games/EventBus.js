var EventBus = function () {
	this._events = {};
};

EventBus.prototype = {
	raiseEvent : function (eventName, args) {
		var listeners = this._getListerners(eventName);
		var eventObject = {
			eventName : eventName,
			args : args
		};
		for (var i = 0; i < listeners.length ; i++) {
			var listener = listeners[i];
			listener.method.apply(listener.scope, [eventObject].concat(listener.args));
		}
	},

	addEventListener : function (eventName, handler) {
		this._getListerners(eventName).push(handler);
		return handler;
	},

	/**
	 * Removes the handler from the registered listeners of given eventName
	 * (Will remove first occurence of the same handler, if several were added)
	 */
	removeEventListener : function (eventName, handler) {
		var listeners = this._getListerners(eventName);
		for (var i = listeners.length - 1 ; i >= 0 ; i--) {
			if (handler == listeners[i] || handler.method == listeners[i].method) {
				listeners.splice(i, 1);			
			}
		}
	},

	_getListerners : function (eventName) {
		if (!this._events[eventName]) {
			this._events[eventName] = [];
		}
		return this._events[eventName];
	}
};

var Handler = function (method , scope, args) {
	this.method = method;
	this.scope = scope;
	this.args = args;
};

// use case 1 : 
/*var bus = new EventBus();
bus.addEventListener("myEvent", new Handler(function (evtName) {console.log(evtName + " logged")}));
//bus.raiseEvent("myEvent");
bus.removeEventListener("myEvent", new Handler(function (evtName) {console.log(evtName)}));
bus.raiseEvent("myEvent");*/

// use case 2 : 

var bus = new EventBus();
var MyClass = function () {
	this.creationDate = (new Date() + "").substring(0, 24);
	console.log (this.onMyEvent + "");
	this._myEventHandler = bus.addEventListener("myEvent", new Handler(this.onMyEvent, this, ["hi !"]));
};

MyClass.prototype.onMyEvent = function (event, attachedArg) {
	console.log("Instance created at ['"+this.creationDate+"'] captured event : ['" + event.eventName + "']. And by the way : " + attachedArg + " " + event.args.raiseArg);
};

MyClass.prototype.destroy = function () {
	bus.removeEventListener("myEvent", this._myEventHandler);
};

var myInstance = new MyClass;
window.setTimeout(function () {
	bus.raiseEvent("myEvent", {raiseArg : ' it\'s now ' + (new Date() + "").substring(0, 24)});
	myInstance.destroy();
	bus.raiseEvent("myEvent");
}, 3000)
