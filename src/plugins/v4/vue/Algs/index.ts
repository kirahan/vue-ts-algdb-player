import Vue from "vue";
import { Component, Watch, Provide, Ref } from "vue-property-decorator";
import Viewport from "../Viewport";
import Setting from "../Setting";
import Playbar from "../Playbar";
import World from "../../cuber/world";
import Database from "../../database";
import Capture from "./capture";

@Component({
  template: require("./index.html"),
  components: {
    viewport: Viewport,
    setting: Setting,
    playbar: Playbar,
  },
})
export default class Algs extends Vue {
  @Provide("world")
  world: World = new World();

  @Provide("database")
  database: Database = new Database("algs", this.world);

  capture: Capture = new Capture();

  algs = require("./algs.json");

  width: number = 0;
  height: number = 0;
  size: number = 0;

  @Ref("viewport")
  viewport: Viewport;

  @Ref("playbar")
  playbar: Playbar;

  @Ref("setting")
  setting: Setting;

  constructor() {
    super();
  }

  tab = "tab-0";
  pics: string[][] = [];

  mounted() {
    this.setting.items["order"].disable = true;
    for (let i = 0; i < this.algs.length; i++) {
      this.pics.push([]);
    }
    let index = window.localStorage.getItem("algs.index");
    if (index) {
      try {
        let data = JSON.parse(index);
        this.index = { group: data.group, index: data.index };
      } catch (error) {
        this.index = { group: 0, index: 0 };
      }
    } else {
      this.index = { group: 0, index: 0 };
    }
    this.$nextTick(this.resize);
    this.$nextTick(() => {
      this.database.refresh();
    });
    this.loop();
  }

  loop() {
    requestAnimationFrame(this.loop.bind(this));
    if (this.viewport?.draw()) {
      return;
    }
    // 生成缩略图
    this.pics.some((group, idx) => {
      if (this.algs[idx].algs.length == group.length) {
        return false;
      }
      let save = window.localStorage.getItem("algs.exp." + this.algs[idx].algs[group.length].name);
      let origin = this.algs[idx].algs[group.length].default;
      let exp = save ? save : origin;
      this.algs[idx].algs[group.length].exp = exp;
      group.push(this.capture.snap(this.algs[idx].strip, exp));
      return true;
    });
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.size = Math.ceil(Math.min(this.width / 6, this.height / 12));
    this.viewport?.resize(this.width, this.height - this.size * 2.6 - 32);
    this.playbar?.resize(this.size);
  }

  get grid() {
    let width = this.size * 8;
    return Math.min(this.width, width);
  }

  get style() {
    return {
      width: this.size + "px",
      height: this.size + "px",
      "min-width": "0%",
      "min-height": "0%",
      "text-transform": "none",
      flex: 1,
    };
  }

  listd: boolean = false;
  tap(key: string) {
    switch (key) {
      case "list":
        this.tab = "tab-" + this.index.group;
        this.listd = true;
        break;
      default:
        break;
    }
  }

  index: { group: number; index: number } = { group: 0, index: 0 };
  @Watch("index")
  onIndexChange() {
    let strip: { [face: string]: number[] | undefined } = this.algs[this.index.group].strip;
<<<<<<< HEAD
    console.log(strip)
    cuber.world.cube.strip(strip);
=======
    this.world.cube.strip(strip);
>>>>>>> 31a0bc659ee86acd054c5c7a8482fc34fc401afe
    this.name = this.algs[this.index.group].algs[this.index.index].name;
    this.origin = this.algs[this.index.group].algs[this.index.index].default;
    let action = window.localStorage.getItem("algs.exp." + this.name);
    if (action) {
      this.action = action;
    } else {
      this.action = this.origin;
    }
<<<<<<< HEAD
<<<<<<< HEAD
    console.log(this.action)
    this.player.scene = "^";
=======
    this.playbar.scene = "^";
>>>>>>> 31a0bc659ee86acd054c5c7a8482fc34fc401afe
=======
    this.playbar.scene = "x2^";
>>>>>>> 482982ae80ca0d72680d6758a9a776df253bf084
    window.localStorage.setItem("algs.index", JSON.stringify(this.index));
  }

  name: string = "";
  origin: string = "";
  action: string = "";
  @Watch("action")
  onActionChange() {
    window.localStorage.setItem("algs.exp." + this.name, this.action);
    if (this.pics[this.index.group][this.index.index]) {
      this.pics[this.index.group][this.index.index] = this.capture.snap(this.algs[this.index.group].strip, this.action);
    }
    this.algs[this.index.group].algs[this.index.index].exp = this.action;
    this.playbar.action = this.action;
  }

  select(i: number, j: number) {
    this.index = { group: i, index: j };
    this.listd = false;
  }
}
