<template>
  <div>
    <div ref="canvas"></div>
  </div>
</template>

<script lang="ts">

import Vue from "vue";
import { Component } from "vue-property-decorator";
import { WebGLRenderer } from "three";
import cuber from "../cuber";
import { COLORS } from "../cuber/define";
import Toucher from "../common/toucher";

Vue.prototype.cuber = cuber;
// type HTMLElement = object

@Component({
  name:'Viewport',
  components: {}
})
export default class Viewport extends Vue {
  renderer: WebGLRenderer;
  toucher: Toucher;
  constructor() {
    super();
    const canvas = document.createElement("canvas");
    canvas.style.outline = "none";
    this.renderer = new WebGLRenderer({
      canvas: canvas,
      antialias: true
    });
    // console.log('renderer',this.renderer)
    this.renderer.autoClear = false;
    this.renderer.setClearColor(COLORS.BACKGROUND);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.toucher = new Toucher();
    // console.log(cuber)
    this.toucher.init(canvas, cuber.controller.touch);
  }

  resize(width: number, height: number) {
    cuber.world.width = width;
    cuber.world.height = height;
    cuber.world.resize();
    this.renderer.setSize(width, height, true);
    const view = this.$refs.cuber;
    if (view instanceof HTMLElement) {
      view.style.width = width + "px";
      view.style.height = height + "px";
    }
    cuber.world.dirty = true;
  }

  
  setoffset(el: HTMLElement){
    this.toucher.setoffset(el)
  }

  mounted() {
    if (this.$refs.canvas instanceof Element) {
      this.$refs.canvas.appendChild(this.renderer.domElement);
      // console.log(cuber.world)
    }
  }

  draw() {
    if (cuber.world.dirty || cuber.world.cube.dirty) {
      this.renderer.clear();
      this.renderer.render(cuber.world.scene, cuber.world.camera);
      cuber.world.dirty = false;
      cuber.world.cube.dirty = false;
      return true;
    }
    return false;
  }
}

</script>

