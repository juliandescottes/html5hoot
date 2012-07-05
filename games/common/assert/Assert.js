Aria.classDefinition({
	$classpath : 'games.common.assert.Assert',
	$dependencies : ['aria.utils.Type'],
	$singleton : true,
	$constructor : function () {
		this.$Type = aria.utils.Type;
	},
	$prototype : {
		isInstanceOf : function (object, classpath, message) {
			if (typeof classpath != "string") {
				classpath = this.__resolveClasspath(classpath);
			}
			var typeUtilsInstanceOf = this.$Type.isInstanceOf(object, classpath);
			var isImplementationOf = this.__isImplementationOf(object, classpath);
			return this.assert(typeUtilsInstanceOf || isImplementationOf, object, message);
		},

		__isImplementationOf : function (object, classpath) {
			return object && object.$interfaces && typeof object.$interfaces[classpath] == 'function'
		},

		__resolveClasspath : function (definition) {
			if (definition && definition.classDefinition) {
				return definition.classDefinition.$classpath;
			}
			if (definition && definition.interfaceDefinition) {
				return definition.interfaceDefinition.$classpath;
			}
		},
		
		isString : function (object, message) {
			return this.assert(this.$Type.isString(object), object, message);
		},
		
		isNumber : function (object, message) {
			return this.assert(this.$Type.isNumber(object), object, message);
		},
		
		isArray : function (object, message) {
			return this.assert(this.$Type.isArray(object), object, message);
		},
		
		isObject : function (object, message) {
			return this.assert(this.$Type.isObject(object), object, message);
		},
		
		isArrayOf : function (object, classpath, message) {
			this.assert(this.$Type.isArray(object), object, message);
			for (var i = 0 ; i < object.length ; i++) {
				this.isInstanceOf(object[i], classpath, message);				
			}
			return object;
		},
		
		isNotString : function (object, message) {
			return this.assert(!this.$Type.isString(object), object, message);
		},
		
		isNotBlank : function (object, message) {
			var isStringAndIsNotEmpty = this.$Type.isString(object) && object != "";
			return this.assert(isStringAndIsNotEmpty, object, message);
		},
		
		isTrue : function (bool, message) {
			return this.assert(bool, true, message);
		},
		
		isNotNull : function (object, message) {
			return this.assert(object !== null, object, message);
		},
		
		isNotUndefined : function (object, message) {
			return this.assert(typeof object != "undefined", object, message);
		},
		
		isNotNullNorUndefined : function (object, message) {
			notNullNorUndefined = typeof object != "undefined" && object !== null;
			return this.assert(notNullNorUndefined, object, message);
		},
		
		assert : function (condition, objectToReturn, errorMessage) {
			if (condition === true) {
				return objectToReturn
			} else {
				var method = arguments.callee.caller, count = 0;
				while (method && count < 5) {
					console.log(method + "");
					method = method.caller;
					count ++;
				}
				throw new Error(errorMessage);
			}
		}
	}
});