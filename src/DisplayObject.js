var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var YinduCreate;
(function (YinduCreate) {
    var DisplayObject = /** @class */ (function () {
        function DisplayObject() {
            /*
            * 坐标系统
            */
            this.$x = 0;
            this.$y = 0;
            /*
            * 锚点
            */
            this.$anchorOffsetX = 0;
            this.$anchorOffsetY = 0;
            /*
            * 缩放
            */
            this.$scaleX = 1;
            this.$scaleY = 1;
            /*
            * 透明度
            */
            this.$alpha = 1;
            /*
            * 旋转角度
            */
            this.$rotation = 0;
            /*名称*/
            this.$name = "";
            /*
            * 尺寸
            */
            this.$width = 0;
            this.$height = 0;
            /*
            * 子元素
            */
            this.$children = [];
            /*
            * 父级
            */
            this.$parent = null;
            /*
            * 遮罩
            */
            this.$mask = null;
            this.$canvas = document.createElement("canvas");
            this.$ctx = this.$canvas.getContext("2d");
            this.$canvas.width = this.$width;
            this.$canvas.height = this.$height;
        }
        Object.defineProperty(DisplayObject.prototype, "x", {
            get: function () {
                return this.$x;
            },
            set: function (val) {
                this.$x = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "y", {
            get: function () {
                return this.$y;
            },
            set: function (val) {
                this.$y = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "anchorOffsetX", {
            get: function () {
                return this.$anchorOffsetX;
            },
            set: function (val) {
                this.$anchorOffsetX = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "anchorOffsetY", {
            get: function () {
                return this.$anchorOffsetY;
            },
            set: function (val) {
                this.$anchorOffsetY = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "scaleX", {
            get: function () {
                return this.$scaleX;
            },
            set: function (val) {
                this.$scaleX = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "scaleY", {
            get: function () {
                return this.$scaleY;
            },
            set: function (val) {
                this.$scaleY = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "alpha", {
            get: function () {
                return this.$alpha;
            },
            set: function (val) {
                this.$alpha = Math.max(Math.min(val, 1), 0);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "width", {
            get: function () {
                return this.$width;
            },
            set: function (val) {
                this.$width = val;
                this.$canvas.width = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "height", {
            get: function () {
                return this.$height;
            },
            set: function (val) {
                this.$height = val;
                this.$canvas.height = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "name", {
            get: function () {
                return this.$name;
            },
            set: function (name) {
                this.$name = name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "rotation", {
            get: function () {
                return this.$rotation;
            },
            set: function (rotation) {
                this.$rotation = rotation % 360;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "parent", {
            //父级只读
            get: function () {
                return this.$parent;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "children", {
            //获取
            get: function () {
                return this.$children;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "mask", {
            get: function () {
                return this.$mask;
            },
            set: function (m) {
                this.$mask = m;
            },
            enumerable: true,
            configurable: true
        });
        DisplayObject.prototype.addChild = function (d) {
            if (d.$parent) {
                return false;
            }
            this.$children.push(d);
            d.$parent = this;
            return true;
        };
        DisplayObject.prototype.removeChild = function (d) {
            var index = this.$children.indexOf(d);
            if (index > -1) {
                this.$children.splice(index, 1);
                d.$parent = null;
            }
            return true;
        };
        DisplayObject.prototype.hasChild = function (d) {
            var index = this.$children.indexOf(d);
            return index > -1;
        };
        DisplayObject.prototype.getChildByName = function (name) {
            var children = this.$children, length = children.length, i = 0;
            for (; i < length; i++) {
                var child = children[i];
                if (child.$name == name) {
                    return child;
                }
            }
            return null;
        };
        DisplayObject.prototype.clearDisplay = function () {
            var _a = this, width = _a.width, height = _a.height;
            this.$ctx.clearRect(0, 0, width, height);
        };
        DisplayObject.prototype.drawDisplay = function () {
            var ctx = this.$ctx;
            var children = this.$children, length = children.length, i = 0;
            for (; i < length; i++) {
                var child = children[i];
                child.update();
                var rotation = child.rotation, x = child.x, y = child.y, width = child.width, height = child.height, anchorOffsetX = child.anchorOffsetX, anchorOffsetY = child.anchorOffsetY, alpha = child.alpha, scaleX = child.scaleX, scaleY = child.scaleY;
                ctx.save();
                ctx.globalAlpha = alpha;
                ctx.translate(x, y);
                ctx.scale(scaleX, scaleY);
                ctx.rotate(rotation * Math.PI / 180);
                ctx.drawImage(child.$canvas, -1 * anchorOffsetX, -1 * anchorOffsetY, width, height);
                ctx.restore();
            }
        };
        DisplayObject.prototype.update = function () {
            this.clearDisplay();
            this.drawDisplay();
        };
        return DisplayObject;
    }());
    YinduCreate.DisplayObject = DisplayObject;
    var Stage = /** @class */ (function (_super) {
        __extends(Stage, _super);
        function Stage(canvas) {
            var _this = _super.call(this) || this;
            var width = canvas.width, height = canvas.height;
            _this.canvas = canvas;
            _this.ctx = _this.canvas.getContext("2d");
            _this.width = width;
            _this.height = height;
            return _this;
        }
        Stage.prototype.update = function () {
            _super.prototype.update.call(this);
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.ctx.drawImage(this.$canvas, 0, 0, this.width, this.height);
        };
        return Stage;
    }(DisplayObject));
    YinduCreate.Stage = Stage;
    var BitMap = /** @class */ (function (_super) {
        __extends(BitMap, _super);
        function BitMap(texture) {
            var _this = _super.call(this) || this;
            _this.$texture = null;
            texture && (_this.$texture = texture);
            return _this;
        }
        Object.defineProperty(BitMap.prototype, "texture", {
            get: function () {
                return this.$texture;
            },
            set: function (texture) {
                this.width = texture.width;
                this.height = texture.height;
                this.$texture = texture;
                var _a = this, width = _a.width, height = _a.height;
            },
            enumerable: true,
            configurable: true
        });
        BitMap.prototype.clearDisplay = function () {
            _super.prototype.clearDisplay.call(this);
            this.$texture && this.$ctx.drawImage(this.$texture, 0, 0, this.width, this.height);
        };
        return BitMap;
    }(DisplayObject));
    YinduCreate.BitMap = BitMap;
})(YinduCreate || (YinduCreate = {}));
