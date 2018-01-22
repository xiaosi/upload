
# 图片上传 以及 修正


## 文档说明


| js文件          | 文件说明         |
| ---------       |:--------------- |
| upload.min.js   | 文件上传插件     |
| alloy_finger.js | 手势操作插件     |
| YinduCreate.js  | 图片上传后的操作 |


## upload.min.js

```javascript
    var uf = new UploadFile({
      selector:".controller"
    });
    uf.on("loadstart",function(){});
    uf.on("loadfinish",function(){});

```



## alloy_finger.js

```javascript
    var af = new AlloyFinger(element, {
        touchStart: function () { },
        touchMove: function () { },
        touchEnd:  function () { },
        touchCancel: function () { },
        multipointStart: function () { },
        multipointEnd: function () { },
        tap: function () { },
        doubleTap: function () { },
        longTap: function () { },
        singleTap: function () { },
        rotate: function (evt) {
            console.log(evt.angle);
        },
        pinch: function (evt) {
            console.log(evt.zoom);
        },
        pressMove: function (evt) {
            console.log(evt.deltaX);
            console.log(evt.deltaY);
        },
        swipe: function (evt) {
            console.log("swipe" + evt.direction);
        }
    });
```

## YinduCreate.js

```javascript
    var yc = new YinduCreate.Stage("canvas"); //舞台
    var bm = new YinduCreate.BitMap();
    bm.texture = image; //纹理
    bm.width = img.width; // 图片宽度
    bm.height = img.height; //图片高度
    bm.x = yc.width/2; // x坐标
    bm.y = yc.height/2; // y坐标
    bm.anchorOffsetX = img.width/2; // 锚点
    bm.anchorOffsetY = img.height/2; // 
    bm.rotation = 0; //旋转角度
    bm.scaleX = bm.scaleY = 1; // 缩放
    yc.addChild(bm);
```

## 示例代码

```javascript

    
    var uf = new UploadFile({
          selector:".controller"
        });
    
        var yc = new YinduCreate.Stage("canvas");
    
    
        uf.on("loadfinish",function(ev){
          var img = new Image;
          img.onload = function(){
            var bm = new YinduCreate.BitMap();
            bm.texture = this;
            bm.width = this.width;
            bm.height = this.height;
            bm.x = yc.width/2;
            bm.y = yc.height/2;
            bm.anchorOffsetX = this.width/2;
            bm.anchorOffsetY = this.height/2;
            bm.rotation = 0;
            bm.scaleX = bm.scaleY = 1;
            yc.addChild(bm);
            var initScale = 1;
            new AlloyFinger(document.querySelector("canvas"),{
              multipointStart:function(){
                initScale = bm.scaleX;
              },
              pressMove:function(evt){
                bm.x += evt.deltaX;
                bm.y += evt.deltaY;
              },
              rotate:function(evt){
                bm.rotation += evt.angle;
              },
              pinch:function(evt){
                bm.scaleX = bm.scaleY = initScale*evt.zoom;
              }
            });
          }
          img.src = ev.result;
    
        });
        var A = null;
        frames();
        function frames(){
          yc.draw();
          A = requestAnimationFrame(frames);
        }
```
 
