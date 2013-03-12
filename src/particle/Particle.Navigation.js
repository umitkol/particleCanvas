(function(window) {

	ParticleNavigation = function(parent) {
		
		this.top = parent;
		this.options = this.top.options;
		
		this.active = 0;
		this.total = this.top.children.length;
		
		this.prev = document.getElementById(this.options.navigation.prev);
		this.next = document.getElementById(this.options.navigation.next);
		
		this.initialize();
		
	}
	
	ParticleNavigation.prototype.initialize = function() {
		this.prev.addEventListener("click", ParticleHelper.getMethodName(this, "doPrev"), false);
		this.next.addEventListener("click", ParticleHelper.getMethodName(this, "doNext"), false);
	}
	
	ParticleNavigation.prototype.doPrev = function(e) {
		if (this.active > 0) {
			this.active--;
			var active = this.top.children[this.total - 1 - this.active];
			ParticleAnimation(active, 0);	
		}
	}
	
	ParticleNavigation.prototype.doNext = function(e) {
		if (this.active < (this.total - 1)) {
			this.active++;
			var active = this.top.children[this.total - this.active];
			ParticleAnimation(active, 1);
		}
	}
	
	ParticleNavigation.prototype.toString = function() {
		return "[ParticleNavigation (name="+  this.name +")]";
	}
	
	window.ParticleNavigation = ParticleNavigation;

}(window));
