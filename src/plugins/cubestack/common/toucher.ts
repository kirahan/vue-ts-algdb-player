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

  setoffset = (el: HTMLElement)=>{
    [this.offsetX,this.offsetY] =  [el.getBoundingClientRect().left+window.scrollX,el.getBoundingClientRect().top+window.scrollY]
  }

  mouse = (event: MouseEvent) => {
    this.canvas.tabIndex = 1;
    this.canvas.focus();
    let action = new TouchAction(event.type, event.clientX-this.offsetX, event.clientY-this.offsetY);
    this.callback(action);
    event.returnValue = false;
    return false;
  };

  touch = (event: TouchEvent) => {
    this.canvas.tabIndex = 1;
    this.canvas.focus();
    let touches = event.changedTouches;
    let first = touches[0];
    let action = new TouchAction(event.type, first.clientX, first.clientY);
    this.callback(action);
    event.preventDefault();
    return true;
  };
}
