// inheritance
var classA = function () {
	this.parentProp = "in class A";
	this.myObject = {
		a : 0,
		b : 1
	};
};

classA.prototype = {
	parentMethod : function () {
		console.log("Parent Method !");
	}
}

var classB = function () {
	classA.constructor.call(this);
};

// works well but ... performance and minor hiccup ... cannot dynamically change 
var inherit = function (childConstructor, parentConstructor) {
	for (var i in parentConstructor.prototype) {
		if (parentConstructor.prototype.hasOwnProperty(i) && !childConstructor.prototype.hasOwnProperty(i)) {
			childConstructor.prototype[i] = parentConstructor.prototype[i];
		}
	}
} 

	var magic = function (child, parent) {
		function tmp() {};
		tmp.prototype = parent.prototype;
		child.prototype = new tmp();
		child.prototype.constructor = child;
	}

	var inherit = function (child, parent) {
		child.prototype = Object.create(parent.prototype);
		child.prototype.constructor = child;
	}

var inheritCrockfordIsAMoron = function (childConstructor, parentConstructor) {
	childConstructor.prototype = new parentConstructor();
	childConstructor.prototype.constructor = childConstructor;
}