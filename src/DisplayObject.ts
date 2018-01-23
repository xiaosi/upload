namespace YinduCreate {


  export class DisplayObject {
    /*
    * 坐标系统
    */
    protected $x:number = 0 ;
    protected $y:number = 0 ;
    /*
    * 锚点
    */
    protected $anchorOffsetX:number = 0;
    protected $anchorOffsetY:number = 0;
    /*
    * 缩放
    */
    protected $scaleX:number = 1;
    protected $scaleY:number = 1;

    /*
    * 透明度
    */
    protected $alpha:number = 1;

    /*
    * 旋转角度
    */
    protected $rotation:number = 0;
    /*名称*/
    protected $name:string = "";
    /*
    * 尺寸
    */
    protected $width:number = 0;
    protected $height:number = 0;
    /*
    * 子元素
    */
    protected $children:Array<DisplayObject> = [];

    /*
    * 父级
    */
    protected $parent:DisplayObject = null;


    /*
    * 遮罩
    */

    protected $mask:DisplayObject = null;


    protected $canvas:HTMLCanvasElement;
    protected $ctx:CanvasRenderingContext2D;
    constructor(){
      this.$canvas = document.createElement("canvas");
      this.$ctx = this.$canvas.getContext("2d");
      this.$canvas.width = this.$width;
      this.$canvas.height = this.$height;
    }

    set x(val:number){
      this.$x = val;
    }
    get x():number{
      return this.$x;
    }

    set y(val:number){
      this.$y = val;
    }
    get y():number{
      return this.$y;
    }


    set anchorOffsetX(val:number){
      this.$anchorOffsetX = val;
    }
    get anchorOffsetX():number{
      return this.$anchorOffsetX;
    }

    set anchorOffsetY(val:number){
      this.$anchorOffsetY = val;
    }
    get anchorOffsetY():number{
      return this.$anchorOffsetY;
    }


    set scaleX(val:number){
      this.$scaleX = val;
    }
    get scaleX():number{
      return this.$scaleX;
    }

    set scaleY(val:number){
      this.$scaleY = val;
    }
    get scaleY():number{
      return this.$scaleY;
    }


    set alpha(val:number){
      this.$alpha = Math.max(Math.min(val,1),0);
    }
    get alpha():number{
      return this.$alpha;
    }


    set width(val:number){
      this.$width = val;
      this.$canvas.width = val;
    }
    get width():number{
      return this.$width;
    }


    set height(val:number){
      this.$height = val;
      this.$canvas.height = val;
    }
    get height():number{
      return this.$height;
    }

    set name(name:string){
      this.$name = name;
    }
    get name():string {
      return this.$name;
    }
    set rotation(rotation:number){
      this.$rotation = rotation%360;
    }
    get rotation():number{
      return this.$rotation;
    }

    //父级只读
    get parent():DisplayObject{
      return this.$parent;
    }

    //获取
    get children():Array<DisplayObject>{
      return this.$children;
    }

    set mask(m:DisplayObject){
      this.$mask = m;
    }
    get mask():DisplayObject{
      return this.$mask;
    }
    addChild(d:DisplayObject):boolean{
      if(d.$parent){
        return false;
      }
      this.$children.push(d);
      d.$parent = this;
      return true;

    }
    removeChild(d:DisplayObject):boolean{
      let index =  this.$children.indexOf(d);
      if(index>-1){
        this.$children.splice(index,1);
        d.$parent = null;
      }
      return true;
    }
    hasChild(d:DisplayObject):boolean{
      let index = this.$children.indexOf(d);
      return index>-1;
    }
    getChildByName(name:string):DisplayObject{
      let children =  this.$children,
      {length} = children,
      i = 0;
      for(;i<length;i++){
        let child = children[i];
        if(child.$name==name){
          return child;
        }
      }
      return null;
    }

    protected clearDisplay(){
      let {width,height} = this;
      this.$ctx.clearRect(0,0,width,height);

    }
    protected drawDisplay(){
      let ctx:CanvasRenderingContext2D = this.$ctx;
      let children = this.$children  ,{length} = children,i = 0;
      for(;i<length;i++){
        let child = children[i];
        child.update();
        let  {rotation,x,y,width,height,anchorOffsetX,anchorOffsetY,alpha,scaleX,scaleY} = child;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(x,y);
        ctx.scale(scaleX,scaleY);
        ctx.rotate(rotation*Math.PI/180);

        ctx.drawImage(child.$canvas,-1*anchorOffsetX,-1*anchorOffsetY,width,height);
        ctx.restore();

      }

    }
    protected update(){
      this.clearDisplay();
      this.drawDisplay();
    }


  }


  export class Stage extends DisplayObject{
    private canvas:HTMLCanvasElement;
    private ctx:CanvasRenderingContext2D;
    constructor(canvas:HTMLCanvasElement){
      super();
      let {width,height} = canvas;
      this.canvas = canvas;
      this.ctx = this.canvas.getContext("2d");
      this.width = width;
      this.height = height;
    }

    public update(){

      super.update();
      this.ctx.clearRect(0,0,this.width,this.height);
      this.ctx.drawImage(this.$canvas,0,0,this.width,this.height);
    }

  }




  export class BitMap extends DisplayObject {
    private $texture: HTMLImageElement = null;
    constructor(texture?:HTMLImageElement ){
      super();
      texture && (this.$texture = texture);
    }
    get texture():HTMLImageElement{
      return this.$texture;
    }
    set texture(texture:HTMLImageElement){
      this.width = texture.width;
      this.height = texture.height;
      this.$texture = texture;
      let {width,height} = this
    }
    protected clearDisplay(){
      super.clearDisplay();
      this.$texture && this.$ctx.drawImage(this.$texture,0,0,this.width,this.height);

    }

  }
}
