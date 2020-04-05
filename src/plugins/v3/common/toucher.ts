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

  setoffset = (canvas: HTMLCanvasElement)=>{
    // 不需要计算scroll值，只需要在scroll事件发生的时候重新计算一次即可
    [this.offsetX,this.offsetY] =  [canvas.getBoundingClientRect().left,canvas.getBoundingClientRect().top]
  }

  mouse = (event: MouseEvent) => {
    this.canvas.tabIndex = 1;
    this.canvas.focus();
    let action = new TouchAction(event.type, event.clientX - this.offsetX, event.clientY- this.offsetY);
    this.callback(action);
    event.returnValue = false;
    return false;
  };

  touch = (event: TouchEvent) => {
    this.canvas.tabIndex = 1;
    this.canvas.focus();
    let touches = event.changedTouches;
    let first = touches[0];
    let action = new TouchAction(event.type, first.clientX- this.offsetX, first.clientY- this.offsetY);
    this.callback(action);
    event.preventDefault();
    return true;
  };
}
