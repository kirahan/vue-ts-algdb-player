<template>
    <v-layout row wrap>
        <v-flex
            xs12
            :style="{'padding-left': size / 2 + 'px','padding-right': size / 2 + 'px','padding-top': size * 0.2 + 'px'}"
        >
            <v-slider
            style="margin: 0%;padding: 0%;"
            hide-details
            :thumb-label="progress!=0?'always':false"
            ticks="always"
            v-model="progress"
            :max="actions.length"
            >
            <template v-slot:thumb-label>{{progress==0?'#':actions[progress - 1].value}}</template>
            </v-slider>
        </v-flex>
        <v-flex xs12 style="display: flex;" :style="{'padding-left': size / 4 + 'px','padding-right': size / 4 + 'px'}">
            <v-btn :style="style" text large :disabled="disable || (progress==0 && !chaos)" @click="init">
            <v-icon :size="size * 0.8">skip_previous</v-icon>
            </v-btn>
            <v-btn :style="style" text large :disabled="disable || progress==0 || chaos" @click="backward">
            <v-icon :size="size * 0.8">fast_rewind</v-icon>
            </v-btn>
            <v-btn :style="style" text large :disabled="disable || progress == actions.length || chaos" @click="toggle">
            <v-icon :size="size * 0.8">{{playing?'pause':'play_arrow'}}</v-icon>
            </v-btn>
            <v-btn :style="style" text large :disabled="disable || progress == actions.length || chaos" @click="forward">
            <v-icon :size="size * 0.8">fast_forward</v-icon>
            </v-btn>
            <v-btn :style="style" text large :disabled="disable || (progress==actions.length) || chaos" @click="finish">
            <v-icon :size="size * 0.8">skip_next</v-icon>
            </v-btn>
        </v-flex>
    </v-layout>

</template>



<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch, Inject } from "vue-property-decorator";
import { TwistAction, TwistNode } from "../../cuber/twister";
import World from "../../cuber/world";

@Component({
    name: 'Playbar',
    components: {},
})
export default class Playbar extends Vue {
  @Inject("world")
  world: World;

  @Prop({ required: false, default: false })
  disable: boolean;

  size: number = 0;
  constructor() {
    super();
  }

  mounted() {
    this.world.callbacks.push(() => {
      this.callback();
    });
  }

  resize(size: number) {
    this.size = size;
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

  playing: boolean = false;
  pprogress: number = 0;

  get progress() {
    return this.pprogress;
  }
  set progress(value) {
    this.init();
    for (let i = 0; i < value; i++) {
      let action = this.actions[i];
      this.world.twister.twist(action.exp, action.reverse, action.times, true);
    }
    this.pprogress = value;
  }

  @Watch("progress")
  onProgressChange() {
    this.world.controller.lock = this.progress > 0;
  }

  scene: string = "";
  @Watch("scene")
  onSceneChange() {
    this.init();
  }

  action: string = "";
  actions: TwistAction[] = [];
  @Watch("action")
  onActionChange() {
    this.actions = new TwistNode(this.action).parse();
    this.init();
  }

  init() {
    this.world.controller.lock = false;
    this.playing = false;
    this.pprogress = 0;
    this.world.controller.disable = false;
    this.world.twister.finish();
    this.world.twister.twist("#");
    let scene = this.scene == "^" ? "(" + this.action + ")'" : this.scene;
    this.world.twister.twist(scene, false, 1, true);
    this.world.cube.history.clear();
  }

  finish() {
    this.init();
    this.world.twister.twist(this.action, false, 1, true);
    this.pprogress = this.actions.length;
  }

  callback() {
    if (this.playing) {
      if (this.pprogress == this.actions.length) {
        if (this.playing) {
          this.playing = false;
        }
        return;
      }
      let action = this.actions[this.pprogress];
      this.pprogress++;
      this.world.twister.twist(action.exp, action.reverse, action.times, false);
    }
  }

  toggle() {
    if (this.playing) {
      this.playing = false;
    } else {
      if (this.pprogress == 0) {
        this.init();
      }
      this.playing = true;
      this.callback();
    }
  }

  forward() {
    if (this.pprogress == this.actions.length) {
      return;
    }
    if (this.pprogress == 0) {
      this.init();
    }
    this.playing = false;
    let action = this.actions[this.pprogress];
    this.pprogress++;
    this.world.twister.twist(action.exp, action.reverse, action.times);
  }

  backward() {
    if (this.pprogress == 0) {
      return;
    }
    this.playing = false;
    this.pprogress--;
    let action = this.actions[this.pprogress];
    this.world.twister.twist(action.exp, !action.reverse, action.times);
  }

  get chaos() {
    return this.progress == 0 && this.world.cube.history.length != 0;
  }
}

</script>


<style scoped>

</style>