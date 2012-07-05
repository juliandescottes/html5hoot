Aria.classDefinition({
	$classpath:'mockato.mock.Mock',
	$dependencies : ['mockato.StubStore', 'mockato.CallHistory', 'mockato.mock.InterfaceMockBuilder', 'mockato.mock.ClassMockBuilder'],
	$extends : 'games.common.BaseObject',
	$constructor : function (classpath) {
		this.$BaseObject.constructor.call(this);
		this.__classpath = classpath;
		return this.build();
	},
	$prototype : {
		build : function () {
			var classRef = Aria.getClassRef(this.__classpath);
			if (classRef) {
				return this.__buildFromClassRef(classRef);
			} else {
				throw new Error("Mocked classpath : " + this.__classpath + " could not be retrieved." + 
				 "Make sure this classpath was loaded and defined before attempting to mock.");
			}
		},
		
		__buildFromClassRef : function (classRef) {
			if (classRef.classDefinition) {
				return new this.$ClassMockBuilder(classRef).build();
			} else if (classRef.interfaceDefinition) {
				return new this.$InterfaceMockBuilder(classRef).build();
			} else {
				throw new Error("Unsupported Object for Mock. Supported AT objects : classDefinition, interfaceDefinition");
			}
		}
	}
});