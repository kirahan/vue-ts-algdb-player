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
  private offsetX: number = 0
  private offsetY: number = 0

  init(dom: HTMLElement, callback: Function) {
    this.dom = dom;
    this.callback = callback;
    dom.addEventListener("touchstart", this.touch);
    dom.addEventListener("touchmove", this.touch);
    dom.addEventListener("touchend", this.touch);
    dom.addEventListener("touchcancel", this.touch);

    dom.addEventListener("mousedown", this.mouse);
    dom.addEventListener("mousemove", this.mouse);
    dom.addEventListener("mouseup", this.mouse);
    dom.addEventListener("mouseout", this.mouse);
  }
  dom: HTMLElement;
  callback: Function;


  setoffset = (canvas: HTMLCanvasElement)=>{
    // 不需要计算scroll值，只需要在scroll事件发生的时候重新计算一次即可
    [this.offsetX,this.offsetY] =  [canvas.getBoundingClientRect().left,canvas.getBoundingClientRect().top]
  }

  mouse = (event: MouseEvent) => {
    this.dom.tabIndex = 1;
    this.dom.focus();
    let action = new TouchAction(event.type, event.clientX - this.offsetX, event.clientY- this.offsetY);
    this.callback(action);
    event.returnValue = false;
    return false;
  };

  touch = (event: TouchEvent) => {
    this.dom.tabIndex = 1;
    this.dom.focus();
    let touches = event.changedTouches;
    let first = touches[0];
    let action = new TouchAction(event.type, first.clientX- this.offsetX, first.clientY- this.offsetY);
    this.callback(action);
    event.preventDefault();
    return true;
  };
}
