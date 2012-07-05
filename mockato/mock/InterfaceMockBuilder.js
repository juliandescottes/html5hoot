Aria.classDefinition({
	$classpath : 'mockato.mock.InterfaceMockBuilder',
	$extends : 'games.common.BaseObject',
	$dependencies : ['aria.utils.Json', 'mockato.mock.MockedClassDefinitionBuilder'], 
	$constructor : function (interfaceObject) {
		this.$BaseObject.constructor.call(this);
		this.__interfaceObject = interfaceObject;
	},
	$prototype : {
		build : function () {
			var classpath = this.__interfaceObject.interfaceDefinition.$classpath,
				methods = this.__getInterfaceMethods(this.__interfaceObject);
			
			var mockClassDef = new this.$MockedClassDefinitionBuilder(classpath, methods).build();
			mockClassDef.$implements = [classpath];

			return this.__defineClassAndGetInstance(mockClassDef);
		},
		
		__getInterfaceMethods : function (interfaceObject) {
			var methods = interfaceObject.interfaceDefinition.$interface;
			for(var i in methods) {
				if (!methods.hasOwnProperty(i)) continue;
				if (methods[i].$type != "Function"){
 					delete methods[i];
				}
			}
			if (interfaceObject.superInterface) {
				this.$Json.inject(this.__getInterfaceMethods(interfaceObject.superInterface), methods);
			}
			return methods;
		},

		__defineClassAndGetInstance : function (classDef) {
			Aria.classDefinition(classDef);

			return new (Aria.getClassRef(classDef.$classpath))();
		}
	}
});