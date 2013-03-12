(function(window) {
	
	ParticleItem = function(parent) {
		this.top = parent;
		this.image = this.top.image;
		this.index = this.top.i;
		this.rowIndex = this.top.rowStep;
		
		var width = this.width = parseInt(this.image.width / this.top.top.options.col);
		var height = this.height = parseInt(this.image.height / this.top.top.options.row);
		
		this.isLastColumn = ((this.index + 1) > ((this.top.top.options.col * this.top.top.options.row) - this.top.top.options.col));
		this.isLastRow = (this.index+1) % this.top.top.options.col == 0;
		
		this.excessWidth = (this.isLastRow) ? parseInt(this.top.top.options.width - (width * this.top.top.options.col)) : 0;
		this.excessHeight = (this.isLastColumn) ? parseInt(this.top.top.options.height - (height * this.top.top.options.row)) : 0;
		
		this.width += this.excessWidth;
		this.height += this.excessHeight;
		
		ParticleItem.maxWidth = width + parseInt(this.top.top.options.width - (width * this.top.top.options.col));
		ParticleItem.maxHeight = height + parseInt(this.top.top.options.height - (height * this.top.top.options.row));
		
		this.desX = (this.width - this.excessWidth) * (this.index % this.top.top.options.col);
		this.desY = (this.height - this.excessHeight) * this.rowIndex;
		
		this.initialize();
	}
	
	ParticleItem.prototype = new Container();
	
	ParticleItem.prototype.ParticleItem_initialize = ParticleItem.prototype.initialize;
	
	ParticleItem.prototype.initialize = function() {
		this.ParticleItem_initialize();
		
		var bitmap = new ParticleCrop(this.image, this.width, this.height, this.desX, this.desY);
		this.addChildAt(bitmap, this.getNumChildren()-1);
		this.x = this.desX;
		this.y = this.desY;
		
		this.name = "child_"+this.x+"_"+this.y;
	}
	
	ParticleItem.prototype.toString = function() {
		return "[ParticleItem (name="+  this.name +")]";
	}

	window.ParticleItem = ParticleItem;
	
}(window));