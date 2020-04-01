<template>
  <div>
    <div ref="canvas"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { WebGLRenderer } from "three";
import {Cuber} from "../../cuber";
import { COLORS } from "../../cuber/define";
import Toucher from "../../common/toucher";

@Component({
  name:'Viewport',
  components: {}
})
export default class Viewport extends Vue {
  renderer: WebGLRenderer;
  toucher: Toucher;
  cuber: Cuber;
  constructor() {
    super();
    this.cuber = new Cuber()
    let canvas = document.createElement("canvas");
    canvas.style.outline = "none";
    this.renderer = new WebGLRenderer({
      canvas: canvas,
      antialias: true
    });
    this.renderer.autoClear = false;
    this.renderer.setClearColor(COLORS.BACKGROUND);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.toucher = new Toucher();
    this.toucher.init(canvas, this.cuber.controller.touch);
  }

  resize(width: number, height: number) {
    this.cuber.world.width = width;
    this.cuber.world.height = height;
    this.cuber.world.resize();
    this.renderer.setSize(width, height, true);
    let view = this.$refs.cuber;
    if (view instanceof HTMLElement) {
      view.style.width = width + "px";
      view.style.height = height + "px";
    }
    this.cuber.world.dirty = true;
  }

  setoffset(el: HTMLElement){
    this.toucher.setoffset(el)
  }

  mounted() {
    if (this.$refs.canvas instanceof Element) {
      this.$refs.canvas.appendChild(this.renderer.domElement);
    }
  }

  draw() {
    if (this.cuber.world.dirty || this.cuber.world.cube.dirty) {
      this.renderer.clear();
      this.renderer.render(this.cuber.world.scene, this.cuber.world.camera);
      this.cuber.world.dirty = false;
      this.cuber.world.cube.dirty = false;
      return true;
    }
    return false;
  }
}

</script>