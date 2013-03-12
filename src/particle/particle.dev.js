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
	
	ParticleAnimation = function(obj, status) {
		ParticleAnimation.options = obj.parent.options;
		ParticleAnimation.to(obj, status);
	}
	
	ParticleAnimation.to  = function(obj, status) {
		
		ParticleAnimation.that = obj;
		var children = ParticleAnimation.that.children;
		ParticleAnimation.options.total = children.length;
		
		var effect = ParticleAnimation.options.animation.effect();
		
		ParticleAnimation.options.effectLength = ParticleHelper.getObjectLength(effect);
		
		for (var index = 0; index < ParticleAnimation.options.total; index++) {
			
			var that = children[index];
			
			var effectLength = 0;
			
			for (var effectIndex in effect) {
				
				effectLength++;
				
				if (that["data_"+effectIndex] == undefined) {
					that["data_"+effectIndex] = that[effectIndex];
				}
				var effectFinish = (status) ? effect[effectIndex] : that["data_"+effectIndex];
				ParticleAnimation.run(that, index, effectIndex, parseInt(that["data_"+effectIndex]), effectFinish, effectLength);
				
			}
			
		}
		
	}
	
	ParticleAnimation.run = function(that, index, effectIndex, begin, finish, effectLength) {
		
		setTimeout(function() {
		
			var tween = new Tween(that, effectIndex, ParticleAnimation.options.animation.type, parseInt(that[effectIndex]), finish, ParticleAnimation.options.animation.speed);
			
			if (ParticleAnimation.options.effectLength == effectLength) {
				if ((index + 1) == ParticleAnimation.options.total) {
					
					tween.onMotionFinished = function(){
						if (ParticleAnimation.options.animation.callBack != undefined) ParticleAnimation.options.animation.callBack(that);
					};
					
				}
			}
			
		}, index * ParticleAnimation.options.animation.time);
		
	}
	
	ParticleAnimation._default = function() {
		return ParticleAnimation.left();
	}
	
	ParticleAnimation.left = function() {
		return { x  : -ParticleAnimation.options.width }
	}
	
	ParticleAnimation.right = function() {
		return { x  : ParticleAnimation.options.width }
	}
	
	ParticleAnimation.top = function() {
		return { y  : -ParticleAnimation.options.height }
	}
	
	ParticleAnimation.bottom = function() {
		return { y  : ParticleAnimation.options.height }
	}
	
	ParticleAnimation.leftTop = function() {
		return { x : -ParticleItem.maxWidth, y  : -ParticleItem.maxHeight }
	}
	
	ParticleAnimation.leftBottom = function() {
		return { x : -ParticleItem.maxWidth, y  : ParticleAnimation.options.height }
	}
	
	ParticleAnimation.rightTop = function() {
		return { x : ParticleAnimation.options.width, y  : -ParticleItem.maxHeight }
	}
	
	ParticleAnimation.rightBottom = function() {
		return { x : ParticleAnimation.options.width, y  : ParticleAnimation.options.height }
	}
	
	ParticleAnimation.alpha = function() {
		return { alpha  : 0 }
	}
	
	ParticleAnimation.rotationToLeft = function() {
		return { rotation  : -360, x : -ParticleItem.maxWidth * 2 }
	}
	
	ParticleAnimation.rotationToRight = function() {
		return { rotation  : -360, x : ParticleAnimation.options.width }
	}
	
	ParticleAnimation.rotationToLeftTop = function() {
		return { rotation  : -360, x : -ParticleItem.maxWidth, y : -ParticleItem.maxHeight * 2 }
	}
	
	ParticleAnimation.rotationToLeftBottom = function() {
		return { rotation  : -360, x : -ParticleItem.maxWidth, y : ParticleItem.maxHeight * 2 }
	}
	
	ParticleAnimation.rotationToRightTop = function() {
		return { rotation  : -360, x : ParticleAnimation.options.width, y : -ParticleItem.maxHeight * 2 }
	}
	
	ParticleAnimation.rotationToRightBottom = function() {
		return { rotation  : -360, x : ParticleAnimation.options.width, y : ParticleItem.maxHeight * 2 }
	}
	
	ParticleAnimation.inSide = function() {
		return { x : (ParticleAnimation.options.width / 2) - (ParticleItem.maxWidth / 2), y : (ParticleAnimation.options.height / 2) - (ParticleItem.maxHeight / 2), alpha : 0 }
	}
	
	ParticleAnimation.randomPosition = function() {
		return { x : Math.random() * ParticleAnimation.options.width, y : Math.random() * ParticleAnimation.options.height, alpha : 0 }
	}
	
	ParticleAnimation.prototype.toString = function() {
		return "[ParticleAnimation (name="+  this.name +")]";
	}
	
	window.ParticleAnimation = ParticleAnimation;
	
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
