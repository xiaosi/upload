(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // Webkit中此取消方法的名字变了
                                      window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());




var YinduCreate = (function(){




  function extend(parent){
    function fn(){}
    fn.prototype = new parent();
    return new fn;
  }

  function DisplayObject(){
    this.$x = 0;
    this.$y = 0;
    this.$anchorOffsetX = 0;
    this.$anchorOffsetY = 0;
    this.$scaleX = 1;
    this.$scaleY = 1;
    
    this.$children = [];
    this.$parent = null;

    this.$rotation = 0;
  }
  Object.defineProperties(DisplayObject.prototype,{
    "x":{
      configurable:true,
      enumerable:true,
      set:function(val){
        this.$x = val;
      },
      get:function(){
        return this.$x;
      }
    },
    "y":{
      configurable:true,
      enumerable:true,
      set:function(val){
        this.$y = val;
      },
      get:function(){
        return this.$y;
      }
    },
    "anchorOffsetX":{
      configurable:true,
      enumerable:true,
      set:function(val){
        this.$anchorOffsetX = val;
      },
      get:function(){
        return this.$anchorOffsetX;
      }
    },
    "anchorOffsetY":{
      configurable:true,
      enumerable:true,
      set:function(val){
        this.$anchorOffsetY = val;
      },
      get:function(){
        return this.$anchorOffsetY;
      }
    },
    "scaleX":{
      configurable:true,
      enumerable:true,
      set:function(val){
        this.$scaleX = val;
      },
      get:function(){
        return this.$scaleX;
      }
    },
    "scaleY":{
      configurable:true,
      enumerable:true,
      set:function(val){
        this.$scaleY = val;
      },
      get:function(){
        return this.$scaleY;
      }
    },
    "parent":{
      configurable:true,
      enumerable:true,
      get:function(){
        return this.$parent;
      },
      set:function(val){
        this.$parent = val;
      }
    },
    "rotation":{
      configurable:true,
      enumerable:true,
      get:function(){
        return this.$rotation;
      },
      set:function(val){
        this.$rotation = val;
      }
    }

  });

  DisplayObject.prototype.addChild = function(displayObject){
    if(displayObject instanceof DisplayObject){
      if(displayObject.parent){
        console.warn("displayObject had parent:",displayObject.parent);
        return ;
      }
      this.$children.push(displayObject);
      displayObject.parent = this;
    }
  }

  DisplayObject.prototype.removeChild = function(displayObject){
    var index = this.$children.indexOf(displayObject);
    if(index>-1){
      this.$children.splice(index,1);
      displayObject.parent = null;
    }
  }

  DisplayObject.prototype.hasChild = function(displayObject){
    var index = this.$children.indexOf(displayObject);
    return !!(index>-1);
  }



  function Stage(canvas){
    DisplayObject.apply(this,arguments);
    this.stage = document.querySelector(canvas);
    this.ctx = this.stage.getContext("2d");
    this.width = this.stage.width;
    this.height = this.stage.height;
  }

  Stage.prototype = extend(DisplayObject);

  Stage.prototype.draw = function(){
    var self = this;
    this.ctx.clearRect(0,0,this.width,this.height);
    function child(obj){
      var children = obj.$children,len = children.length,i=0;
      for(;i<len;i++){
        var child =children[i],
        width = child.width ,
        height = child.height,
        x = child.x ,
        y = child.y ,
        anchorOffsetX = -1*child.anchorOffsetX,
        anchorOffsetY = -1*child.anchorOffsetY,
        scaleX = child.scaleX,
        scaleY = child.scaleY,
        rotation = child.rotation;
        self.ctx.save();
        self.ctx.translate(x,y);
        self.ctx.rotate(Math.PI*rotation/180);
        self.ctx.scale(scaleX,scaleY);
        self.ctx.drawImage(child.texture,anchorOffsetX,anchorOffsetY,width,height);
        self.ctx.restore();
      }
    }
    child(self)

  }


  function BitMap(texture){
    DisplayObject.apply(this,arguments);
    this.$texture = texture || null;

  }
  Object.defineProperties(BitMap.prototype,{
    "texture":{
      configurable:true,
      enumerable:true,
      get:function(){
        return $texture;
      },
      set:function(val){
        this.$texture = val;
      }
    }
  })

  BitMap.prototype = extend(DisplayObject);


  function getTime(){
    return (+new Date());
  }
  return {
    Stage:Stage,
    BitMap:BitMap,
    getTime:getTime
  };
})();
