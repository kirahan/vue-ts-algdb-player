import cuber from ".";

export default class Twister {
  queue: TwistAction[];
  constructor() {
    this.queue = [];
  }

  static shuffle(order: number) {
    let result = "";
    const exps = [];
    let last = -1;
    const actions = ["U", "D", "R", "L", "F", "B"];
    let axis = -1;
    for (let i = 0; i < order * order * order; i++) {
      const exp = [];
      while (axis == last) {
        axis = Math.floor(Math.random() * 3);
      }
      const prefix = Math.ceil(Math.random() * Math.floor(order / 2));
      exp.push(prefix == 1 ? "" : prefix);
      const side = Math.floor(Math.random() * 2);
      exp.push(actions[axis * 2 + side]);
      const suffix = Math.random();
      if (suffix < 0.2) {
        exp.push("2");
      } else if (suffix < 0.6) {
        exp.push("'");
      }
      exps.push(exp.join(""));
      last = axis;
    }
    result = exps.join(" ");
    return result;
  }

  get length() {
    return this.queue.length;
  }

  finish() {
    for (const action of this.queue) {
      action.fast = true;
    }
    cuber.tweener.finish();
  }

  twist(exp: string, reverse = false, times = 1, fast = false) {
    if (this.queue.length > 0) {
      cuber.tweener.finish();
      this.update();
    }
    cuber.tweener.speedup();
    const node = new TwistNode(exp, reverse, times);
    const list = node.parse();
    for (const element of list) {
      element.fast = fast;
      this.queue.push(element);
    }
    this.update();
  }

  push(action: TwistAction) {
    this.queue.push(action);
    this.update();
  }

  update() {
    if (this.queue.length === 0) {
      return;
    }
    if (cuber.world.cube.lock) {
      return;
    }
    const twist = this.queue.shift();
    if (undefined == twist) {
      return;
    }
    this.start(twist);
  }

  start(action: TwistAction) {
    if (action.exp == "~") {
      if (action.fast) {
        this.update();
        return;
      }
      cuber.tweener.tween(0, 1, (cuber.preferance.frames / 2) * action.times, (value: number) => {
        if (value === 1 || value === 0) {
          this.update();
          return;
        }
      });
      return;
    }
    if (action.exp == "#") {
      cuber.history.clear();
      cuber.world.cube.reset();
      cuber.world.cube.dirty = true;
      this.update();
      return;
    }
    if (action.exp == "*") {
      const exp = Twister.shuffle(cuber.world.cube.order);
      cuber.world.cube.reset();
      this.twist(exp, false, 1, true);
      cuber.history.clear();
      return;
    }
    let angle = -Math.PI / 2;
    if (action.reverse) {
      angle = -angle;
    }
    if (action.times) {
      angle = angle * action.times;
    }
    const part = cuber.world.cube.groups.get(action.exp);
    if (part === undefined) {
      this.update();
      return;
    }
    part.angle = 0;
    part.hold();

    if (action.fast) {
      part.angle = angle;
    }
    part.twist(angle);
    return;
  }
}

export class TwistAction {
  exp: string;
  reverse: boolean;
  times: number;
  fast: boolean;
  constructor(exp: string, reverse = false, times = 1, fast = false) {
    this.exp = exp;
    this.reverse = reverse;
    this.times = times;
    this.fast = fast;
  }

  get value() {
    return this.times == 0 ? "" : this.exp + (this.reverse ? "'" : "") + (this.times == 1 ? "" : String(this.times));
  }
}

export class TwistNode {
  static AFFIX = "'Ww0123456789-";
  children: TwistNode[];
  twist: TwistAction;
  constructor(exp: string, reverse = false, times = 1) {
    // 合法性校验
    this.children = [];
    exp = exp.replace(/[^\*\-#~xyzbsfdeulmrw\(\)'0123456789 ]/gi, "");
    this.twist = new TwistAction(exp, reverse, times);
    // 不用解析场景
    if (exp.match(/^[0123456789-]*[\*~#xyzbsfdeulmr][w]*$/gi)) {
      if (/[XYZ]/.test(this.twist.exp)) {
        this.twist.exp = this.twist.exp.toLowerCase();
      }
      return;
    }
    // 先分段
    const list = [];
    let buffer = "";
    let stack = 0;
    let ready = false;
    for (let i = 0; i < exp.length; i++) {
      const c = exp.charAt(i);
      if (c === " " && buffer.length == 0) {
        continue;
      }
      // 后缀可以持续增加
      if (TwistNode.AFFIX.indexOf(c) >= 0) {
        buffer = buffer.concat(c);
        continue;
      }
      // 非后缀检查是否可以中断
      if (buffer.length > 0 && stack == 0 && ready) {
        list.push(buffer);
        buffer = "";
        i--;
        ready = false;
        continue;
      }
      //  如果有括号 记录stack
      if (c === "(") {
        buffer = buffer.concat(c);
        stack++;
        continue;
      }
      if (c === ")") {
        buffer = buffer.concat(c);
        stack--;
        continue;
      }
      ready = true;
      buffer = buffer.concat(c);
    }
    if (buffer.length > 0) {
      list.push(buffer);
    }
    if (list.length == 0) {
      return;
    }
    for (const item of list) {
      // 拆解括号
      let values = item.match(/^\((.+)\)('?)(\d*)('?)$/i);
      // 无括号
      if (null === values) {
        values = item.match(/([0123456789-]*[\*\#~xyzbsfdeulmr][w]*)('?)(\d*)('?)/i);
      }
      // 异常情况
      if (null === values) {
        return;
      }
      const reverse = (values[2] + values[4]).length == 1;
      const times = values[3].length == 0 ? 1 : parseInt(values[3]);
      this.children.push(new TwistNode(values[1], reverse, times));
    }
  }

  parse(reverse = false) {
    reverse = this.twist.reverse !== reverse;
    const _result: TwistAction[] = [];
    if (0 !== this.children.length) {
      for (let i = 0; i < this.twist.times; i++) {
        for (let j = 0; j < this.children.length; j++) {
          var n;
          if (reverse) {
            n = this.children[this.children.length - j - 1];
          } else {
            n = this.children[j];
          }
          const list = n.parse(reverse);
          for (const element of list) {
            _result.push(element);
          }
        }
      }
    } else if (this.twist.exp != "") {
      const action = new TwistAction(this.twist.exp, reverse, this.twist.times);
      _result.push(action);
    }
    return _result;
  }

  get value() {
    return this.twist.value;
  }
}
