(function(window) {

	ParticleHelper = function() {
		throw "ParticleHelper cannot be instantiated.";
	}
	
	ParticleHelper.getMethodName = function(object, methodName) {
		return function () {
		    object[methodName].apply(object, arguments);
		};
	}
	
	ParticleHelper.getObjectLength = function(object) {
		var total = 0;
		for (var i in object) {
			total++;
		}
		return total;
	}
	
	ParticleHelper.extend = function(param1, param2) {
		if (typeof param1 != "object" || typeof param2 != "object") return false;
		for (var i in param1) {
			if (param2[i] == undefined || param2[i] == "") {
				param2[i] = param1[i];
			}
		}
		
		return param2;
	}
	
	window.ParticleHelper = ParticleHelper;
	
}(window));