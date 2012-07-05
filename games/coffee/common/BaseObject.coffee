Aria.classDefinition
	$classpath : 'games.common.BaseObject'
	$constructor :->
		@$JsObject.constructor.call @
		@createShortcutsForDependencies()
	$prototype : 
		createShortcutsForDependencies :->
			if not @constructor.classDefinition.$alreadyCreatedShortcutDep	
				@createShortcutForClasspath classpath for classpath in @getDependenciesRec @
				@constructor.classDefinition.$alreadyCreatedShortcutDep = true

		getDependenciesRec : (classObject) -> 
			dependencies = @getDependencies classObject
			superklass = classObject.constructor.superclass
			if superklass then dependencies.concat(@getDependenciesRec superklass) else dependencies
		
		getDependencies : (classObject) ->
			classObject.constructor.classDefinition.$dependencies or []

		createShortcutForClasspath : (classpath) ->  
			classname = @extractClassnameFromClasspath classpath
			if not @constructor.prototype["$#{classname}"] then @constructor.prototype["$#{classname}"] = Aria.getClassRef classpath

		extractClassnameFromClasspath : (classpath) -> 
			classpath.match(/\.([0-9a-z_]+)$/i)[1]

		on : (object, event, callback) ->  
			events = {}
			events[event] = 
				fn : callback
				scope : this
			object.$on events