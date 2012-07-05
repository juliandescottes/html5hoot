Aria.testDefinition = function (testConfiguration) {
	testConfiguration.$extends = "aria.jsunit.TestCase";
	var userDefinedConstructor = testConfiguration.$constructor || function () {};
	var dependencyToMainClass = testConfiguration.$classpath.replace(/Test(.(?!(Test)))*$/,"")
	var dependencies = testConfiguration.$dependencies || [];
	dependencies.push(dependencyToMainClass);
	testConfiguration.$dependencies = dependencies;
	testConfiguration.$constructor = function () {
		this.$TestCase.constructor.call(this);
		userDefinedConstructor.call(this);
	}; 
	testConfiguration.$prototype.callAfter100Ms = function (callback) {
			this.waitAndCall(100, callback);
	};
		
	testConfiguration.$prototype.waitAndCall = function (delay, callback) {
		var oSelf = this;
		window.setTimeout(function(){
			oSelf.callAsyncMethod(oSelf, "afterWaitAndCall", [callback])
		}, delay);		
	};
	
	testConfiguration.$prototype.afterWaitAndCall = function (userCallback, testCallback) {
		userCallback.apply(this);
		this.$callback(testCallback);
	};
	if (testConfiguration.$prototype.setup) {
		testConfiguration.$prototype.setUp = testConfiguration.$prototype.setup;
	}
	return Aria.classDefinition(testConfiguration);
};

Aria.testSuiteDefinition = function (testSuiteConfiguration) {
	testSuiteConfiguration.$extends = "aria.jsunit.TestSuite";
	var tests = testSuiteConfiguration.$tests;
	var userDefinedConstructor = testSuiteConfiguration.$constructor || function () {};
	testSuiteConfiguration.$constructor = function () {
		this.$TestSuite.constructor.call(this);
		userDefinedConstructor.call(this);
		this.addTests.apply(this, tests);
	};
	return Aria.classDefinition(testSuiteConfiguration);
};

/**
 * Test suite regrouping all tests of the aria namespace
 */
Aria.testSuiteDefinition({
	$classpath : 'MainTestSuite',
	$tests : [
		'games.GamesTestSuite', 
		'mockato.MockatoTestSuite']
})
