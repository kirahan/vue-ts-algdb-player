import World from './world';
import { COLORS } from "./define";
import vm from "../../../main";
import Cubelet from "./cubelet";

export class Theme {
    private world: World;
    private default: string;
    constructor(world: World) {
      this.world = world;
      this.default = JSON.stringify(COLORS);
    }
    private data: { version: string; dark: boolean; colors: { [key: string]: string } } = {
      version: "0.2",
      dark: false,
      colors: {},
    };
  
    load(value: string) {
      let data = JSON.parse(value);
      if (data.version === this.data.version) {
        this.data = data;
      }
    }
    get value() {
      return JSON.stringify(this.data);
    }
  
    refresh() {
      this.dark = this.data.dark;
      for (const key in this.data.colors) {
        let value = this.data.colors[key];
        if (value) {
          COLORS[key] = value;
          Cubelet.LAMBERS[key].color.set(value);
          Cubelet.BASICS[key].color.set(value);
          if (key == "Core") {
            Cubelet.PHONG.color.set(value);
          }
        }
      }
      this.world.dirty = true;
    }
  
    color(key: string, value: string) {
      this.data.colors[key] = value;
      COLORS[key] = value;
      Cubelet.LAMBERS[key].color.set(value);
      Cubelet.BASICS[key].color.set(value);
      if (key == "Core") {
        Cubelet.PHONG.color.set(value);
      }
      this.world.dirty = true;
    }
  
    reset() {
      this.data.colors = JSON.parse(this.default);
      this.refresh();
      this.data.colors = {};
    }
  
    get dark() {
      return this.data.dark;
    }
    set dark(value) {
      if (this.data.dark != value) {
        this.data.dark = value;
      }
      // vm.$vuetify.theme.dark = value;
    }
  }