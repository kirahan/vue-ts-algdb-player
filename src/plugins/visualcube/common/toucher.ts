export class TouchAction {
  type: string;
  x: number;
  y: number;
  constructor(type: string, x: number, y: number) {
    this.type = type;
    this.x = x;
    this.y = y;
  }
}

export default class Toucher {
  private offsetX = 0
  private offsetY = 0


  init(canvas: HTMLCanvasElement, callback: Function) {
    this.canvas = canvas;
    this.callback = callback;
    canvas.addEventListener("touchstart", this.touch);
    canvas.addEventListener("touchmove", this.touch);
    canvas.addEventListener("touchend", this.touch);
    canvas.addEventListener("touchcancel", this.touch);

    canvas.addEventListener("mousedown", this.mouse);
    canvas.addEventListener("mousemove", this.mouse);
    canvas.addEventListener("mouseup", this.mouse);
    canvas.addEventListener("mouseout", this.mouse);
  }
  canvas: HTMLCanvasElement;
  callback: Function;



// 递归获取元素的实际偏移量
  getrealoffset = (el: any)=>{
    if(el){
      let left = el.offsetLeft 
      let top = el.offsetTop 

      if(el.offsetParent && (el.offsetParent.tagName != 'body' || el.offsetParent.tagName != 'BODY')){
        const p = this.getrealoffset(el.offsetParent)
          left += p[0]
          top += p[1]
      }

      return [left,top]
    }else{
      return [0,0]
    }
    
  }

  setoffset = (el: HTMLElement)=>{
     [this.offsetX,this.offsetY] = this.getrealoffset(el)
  }


  mouse = (event: MouseEvent) => {
    this.canvas.tabIndex = 1;
    this.canvas.focus();
    const action = new TouchAction(event.type, event.clientX-this.offsetX, event.clientY-this.offsetY);
    this.callback(action);
    event.returnValue = false;
    return false;
  };

  touch = (event: TouchEvent) => {
    this.canvas.tabIndex = 1;
    this.canvas.focus();
    const touches = event.changedTouches;
    const first = touches[0];
    console.log(this.offsetX,this.offsetY)
    const action = new TouchAction(event.type, first.clientX-this.offsetX, first.clientY-this.offsetY);
    this.callback(action);
    event.preventDefault();
    return true;
  };
}
