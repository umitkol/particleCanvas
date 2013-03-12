(function(window) {

	Particle = function(options) {
		
		var settings = {
			col : 5,
			row : 5,
			animation : {
				effect : ParticleAnimation.top,
				speed : .5,
				time : 60,
				type : '',
				callBack : function(container) {
					console.log(container);
				}
			}
		};
		
		this.options = ParticleHelper.extend(settings, options);
		this.canvas = document.getElementById(this.options.canvas);
		
		this.options.width = parseInt(this.canvas.width);
		this.options.height = parseInt(this.canvas.height);
		this.stage = new Stage(this.canvas);
		this.stage.addChild(this);
		Ticker.setInterval(10);
		Ticker.addListener(this.stage);
		
		this.initialize();
		
	}
	
	Particle.prototype = new Container();
	
	Particle.prototype.Particle_initialize = Particle.prototype.initialize;
	
	Particle.prototype.initialize = function() {
		this.Particle_initialize();
		
		for (var i in this.options.data) {
			this.i = i;
			this.addChild(new ParticleContainer(this));
		}
		
		this.navigation = new ParticleNavigation(this);
		
		this.name = "particle_"+this.options.canvas;

	}
	
	Particle.prototype.toString = function() {
		return "[Particle (name="+  this.name +")]";
	}
	
	window.Particle = Particle;

}(window));
