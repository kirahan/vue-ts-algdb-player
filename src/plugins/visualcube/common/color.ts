export var COLORS = {
  primary: "#1976D2",
  black: "#000000",
  white: "#FFFFFF",
  red: "#F44336",
  pink: "#E91E63",
  purple: "#9C27B0",
  indigo: "#3F51B5",
  blue: "#2196F3",
  cyan: "#00BCD4",
  teal: "#009688",
  green: "#4CAF50",
  lime: "#CDDC39",
  yellow: "#FFEB3B",
  amber: "#FFC107",
  orange: "#FF9800",
  brown: "#795548",
  gray: "#9E9E9E"
};

export default class Color {
  static RGB(value: string) {
    value = value.toLowerCase();
    const result = [];
    for (let i = 1; i < 7; i += 2) {
      result.push(parseInt("0x" + value.slice(i, i + 2)));
    }
    return result;
  }

  static RGB2HSV(rgb: number[]) {
    let h = 0,
      s = 0,
      v = 0;
    const r = rgb[0],
      g = rgb[1],
      b = rgb[2];
    rgb.sort(function(a, b) {
      return a - b;
    });
    const max = rgb[2];
    const min = rgb[0];
    v = max / 255;
    if (max === 0) {
      s = 0;
    } else {
      s = 1 - min / max;
    }
    if (max === min) {
      h = 0;
    } else if (max === r && g >= b) {
      h = 60 * ((g - b) / (max - min)) + 0;
    } else if (max === r && g < b) {
      h = 60 * ((g - b) / (max - min)) + 360;
    } else if (max === g) {
      h = 60 * ((b - r) / (max - min)) + 120;
    } else if (max === b) {
      h = 60 * ((r - g) / (max - min)) + 240;
    }
    h = Math.floor(h);
    s = Math.floor(s * 100);
    v = Math.floor(v * 100);
    return [h, s, v];
  }

  static HSV2RGB(hsv: number[]) {
    let h = hsv[0],
      s = hsv[1],
      v = hsv[2];
    s = s / 100;
    v = v / 100;
    let r = 0,
      g = 0,
      b = 0;
    const i = Math.floor((h / 60) % 6);
    const f = h / 60 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    switch (i) {
      case 0:
        r = v;
        g = t;
        b = p;
        break;
      case 1:
        r = q;
        g = v;
        b = p;
        break;
      case 2:
        r = p;
        g = v;
        b = t;
        break;
      case 3:
        r = p;
        g = q;
        b = v;
        break;
      case 4:
        r = t;
        g = p;
        b = v;
        break;
      case 5:
        r = v;
        g = p;
        b = q;
        break;
      default:
        break;
    }
    r = Math.floor(r * 255.0);
    g = Math.floor(g * 255.0);
    b = Math.floor(b * 255.0);
    return [r, g, b];
  }

  static HSVD(hsv1: number[], hsv2: number[]) {
    const r = 50;
    const h = 90;
    const x1 = r * hsv1[2] * hsv1[1] * Math.cos((hsv1[0] / 180) * Math.PI);
    const y1 = r * hsv1[2] * hsv1[1] * Math.sin((hsv1[0] / 180) * Math.PI);
    const z1 = h * (1 - hsv1[2]);
    const x2 = r * hsv2[2] * hsv2[1] * Math.cos((hsv2[0] / 180) * Math.PI);
    const y2 = r * hsv2[2] * hsv2[1] * Math.sin((hsv2[0] / 180) * Math.PI);
    const z2 = h * (1 - hsv2[2]);
    const dx = x1 - x2;
    const dy = y1 - y2;
    const dz = z1 - z2;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  static RGBD(rgb1: number[], rgb2: number[]) {
    const rmean = (rgb1[0] + rgb2[0]) / 2;
    const r = rgb1[0] - rgb2[0];
    const g = rgb1[1] - rgb2[1];
    const b = rgb1[2] - rgb2[2];
    return Math.sqrt((2 + rmean / 256) * r ** 2 + 4 * g ** 2 + (2 + (255 - rmean) / 256) * b ** 2);
  }
}