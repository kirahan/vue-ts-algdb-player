import {Cuber} from ".";
import { TwistAction } from "./twister";

export default class History {
  list: TwistAction[] = [];
  exp: string = "";
  cuber: Cuber;
  constructor(cuber: Cuber) {
    this.cuber = cuber
  }

  record(action: TwistAction) {
    if (this.list.length == 0) {
      action.times = action.times % 4;
      if (action.times != 0) {
        this.list.push(action);
        this.exp = this.exp + " " + action.value;
      }
    } else {
      let last = this.list[this.list.length - 1];
      if (last.exp == action.exp) {
        last.times = last.times + action.times * (last.reverse == action.reverse ? 1 : -1);
        last.times = last.times % 4;
        this.exp = this.exp.substring(0, this.exp.lastIndexOf(" "));
        if (last.times == 0) {
          this.list.pop();
        } else {
          this.exp = this.exp + " " + last.value;
        }
      } else {
        this.list.push(action);
        this.exp = this.exp + " " + action.value;
      }
    }
  }

  clear() {
    this.list = [];
    this.exp = "";
  }

  get last() {
    return this.list[this.list.length - 1];
  }

  get length() {
    return this.list.length;
  }

  get moves() {
    let length = this.length;
    for (const twist of this.list) {
      if (twist.exp == "x" || twist.exp == "y" || twist.exp == "z") {
        length--;
      }
    }
    return length;
  }

  undo() {
    if (this.length == 0) {
      return;
    }
    this.cuber.twister.finish();
    if (this.length == 0) {
      return;
    }
    let last = this.last;
    let action = new TwistAction(last.exp, !last.reverse, last.times);
    this.cuber.twister.push(action);
  }
}
