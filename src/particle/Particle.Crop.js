(function(window) {

	ParticleCrop = function(image, w, h, x, y) {
		this.initialize(image, w, h, x, y);
	}
	
	ParticleCrop.prototype = new DisplayObject();
	
	ParticleCrop.prototype.DisplayObject_initialize = ParticleCrop.prototype.initialize;
	
	ParticleCrop.prototype.initialize = function(image, w, h, x, y) {
		this.DisplayObject_initialize();
		this.image = image;
		this.width = w;
		this.height = h;
		this.desX = x;
		this.desY = y;
	}
	
	ParticleCrop.prototype.DisplayObject_draw = ParticleCrop.prototype.draw;
	
	ParticleCrop.prototype.draw = function(ctx, ignoreCache) {
		if (this.DisplayObject_draw(ctx, ignoreCache)) { return true; }
		ctx.drawImage(this.image, this.desX, this.desY, this.width, this.height, 0, 0, this.width, this.height);
		return true;
	}
	
	ParticleCrop.prototype.toString = function() {
		return "[ParticleCrop (name="+  this.name +")]";
	}
	
	window.ParticleCrop = ParticleCrop;
	
}(window));