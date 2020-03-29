<template> 
    <v-layout row wrap>
      <v-flex
        xs12
        :style="{'padding-left': size / 2 + 'px','padding-right': size / 2 + 'px','padding-top': size * 0.2 + 'px'}"
      >
        <v-slider
          style="margin: 0%;padding: 0%;"
          readonly
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
        <v-btn :style="style" text large :disabled="disable || progress==0" @click="init">
          <v-icon :size="size * 0.8">skip_previous</v-icon>
        </v-btn>
        <v-btn :style="style" text large :disabled="disable || progress==0" @click="backward">
          <v-icon :size="size * 0.8">fast_rewind</v-icon>
        </v-btn>
        <v-btn :style="style" text large :disabled="disable || progress == actions.length" @click="toggle">
          <v-icon :size="size * 0.8">{{playing?'pause':'play_arrow'}}</v-icon>
        </v-btn>
        <v-btn :style="style" text large :disabled="disable || progress == actions.length" @click="forward">
          <v-icon :size="size * 0.8">fast_forward</v-icon>
        </v-btn>
        <v-btn :style="style" text large :disabled="disable || (progress==actions.length)" @click="finish">
          <v-icon :size="size * 0.8">skip_next</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import cuber from "../cuber";
import { TwistAction, TwistNode } from "../cuber/twister";

@Component({
  name: 'PLayer',
  components: {}
})
export default class Player extends Vue {
  @Prop({ required: false, default: false })
  disable: boolean;

  size = 0;
  constructor() {
    super();
  }

  mounted() {
    cuber.world.callbacks.push(() => {
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
      flex: 1
    };
  }

  playing = false;
  progress = 0;
  @Watch("progress")
  onProgressChange() {
    cuber.controller.lock = this.progress > 0;
  }

  scene = "";
  @Watch("scene")
  onSceneChange() {
    this.init();
  }

  action = "";
  actions: TwistAction[] = [];
  @Watch("action")
  onActionChange() {
    this.actions = new TwistNode(this.action).parse();
    this.init();
  }

  init() {
    cuber.controller.lock = false;
    this.playing = false;
    this.progress = 0;
    cuber.controller.disable = false;
    cuber.twister.finish();
    cuber.twister.twist("#");
    const scene = this.scene == "^" ? "(" + this.action + ")'" : this.scene;
    cuber.twister.twist(scene, false, 1, true);
    cuber.history.clear();
  }

  finish() {
    this.init();
    cuber.twister.twist(this.action, false, 1, true);
    this.progress = this.actions.length;
  }

  callback() {
    if (this.playing) {
      if (this.progress == this.actions.length) {
        if (this.playing) {
          this.playing = false;
        }
        return;
      }
      const action = this.actions[this.progress];
      this.progress++;
      cuber.twister.twist(action.exp, action.reverse, action.times, false);
    }
  }

  toggle() {
    if (this.playing) {
      this.playing = false;
    } else {
      if (this.progress == 0) {
        this.init();
      }
      this.playing = true;
      this.callback();
    }
  }

  forward() {
    if (this.progress == this.actions.length) {
      return;
    }
    if (this.progress == 0) {
      this.init();
    }
    this.playing = false;
    const action = this.actions[this.progress];
    this.progress++;
    cuber.twister.twist(action.exp, action.reverse, action.times);
  }

  backward() {
    if (this.progress == 0) {
      return;
    }
    this.playing = false;
    this.progress--;
    const action = this.actions[this.progress];
    cuber.twister.twist(action.exp, !action.reverse, action.times);
  }
}
</script>



<style scoped>

</style>
