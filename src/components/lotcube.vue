<template>
    <div>
        <h1>cube</h1>
        <VisualCube :config='VisualcubeConfig[0]' ref="cube1"></VisualCube>
        <!-- <VisualCube :config='VisualcubeConfig[1]' ref="cube2"></VisualCube> -->
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VisualCube from '../plugins/cubestack/vue/Algplayer/index.vue'
import Component from 'vue-class-component'
import { Ref } from 'vue-property-decorator'
import {VCCongfig} from '../plugins/cubestack/cuber/preferance';






@Component({
    name : 'puzzle',
    components:{VisualCube}
})
export default class  puzzle extends Vue{
    constructor(){
        super()
    }

    VisualcubeConfig: VCCongfig[] = [
        {
            name: 'cuber1',
            model : 'xxx',
            size : [300,300],
            lock: false,
            cubeconfig:  {
                            order: 3,
                            scale: 60,
                            perspective: 40,
                            angle: 34,
                            gradient: 45,
                            brightness: 70,
                            frames: 40,
                            sensitivity: 40,
                            mirror: false,
                            hollow: false
                },
            playerconfig : {
                enable: true,
                hide: true,
                scene:'^',
                alg: 'RUR',
                autoplay: false,
                loop: true,
                hoverplay: true,
                speed: 'x1',
                masktype: ''
            }
        }
        ]

    @Ref('cube1')  cube1!: VisualCube
    // @Ref('cube2')  cube2!: VisualCube

    mounted(){
    }
}
</script>


<style scoped>

</style>