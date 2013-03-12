(function(window) {

	ParticleContainer = function(parent) {
		this.top = parent;
		this.stage = this.top.stage;
		this.index = this.top.i;
		this.image = new Image();
		this.image.src = this.top.options.data[this.index];
		this.image.onload = ParticleHelper.getMethodName(this, "initialize");
	}

	ParticleContainer.prototype = new Container();
	
	ParticleContainer.prototype.ParticleContainer_initialize = ParticleContainer.prototype.initialize;
	
	ParticleContainer.prototype.initialize = function() {
		this.ParticleContainer_initialize();
		
		this.rowStep = 0;
		
		for (var i = 0; i < (this.top.options.col * this.top.options.row); i++) {
			
			this.i = i;
			this.addChildAt(new ParticleItem(this), i);

			if (((i+1) % this.top.options.col) == 0) this.rowStep++;
		}
		
		this.name = "container_"+this.index;
		
		return this;

	}
	
	ParticleContainer.prototype.setIndex = function(index) {
		console.log(index);
	}
	
	ParticleContainer.prototype.toString = function() {
		return "[ParticleContainer (name="+  this.name +")]";
	}
	
	window.ParticleContainer = ParticleContainer;
	
}(window));