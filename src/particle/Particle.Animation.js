(function(window) {
	
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

}(window));
