<template>
    <div>
        <VisualCube  :cubeconfig='VisualcubeConfig[0]'></VisualCube>
        <VisualCube  :cubeconfig='VisualcubeConfig[1]'></VisualCube>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VisualCube from '../plugins/cubestack/vue/CubeImgCover/index.vue'
import Component from 'vue-class-component'
import { Ref } from 'vue-property-decorator'
import { CubeCongfig } from '../plugins/cubestack/cuber/interface'






@Component({
    name : 'puzzle',
    components:{VisualCube}
})
export default class  puzzle extends Vue{
    constructor(){
        super()
    }

    VisualcubeConfig: CubeCongfig[] = [
        {
            name: 'cube1',
            model : 'xxx',
            lock: true,
            renderconfig:  {
                            cubename: 'cube1',
                            size: [300,300],
                            template: 'playground',
                            coverImgNotModel: true,
                            scene:'^',
                            alg: 'RUR',
                            masktype: ''
                },
            playerconfig : {
                enable: true,
                hide: true,
                autoplay: false,
                loop: true,
                hoverplay: true,
                speed: 'x1',
            }
        },
         {
            name: 'cube2',
            model : 'xxx',
            lock: false,
            renderconfig:  {
                            cubename: 'cube2',
                            size: [300,300],
                            template: 'playground',
                            coverImgNotModel: true,
                            scene:'^',
                            alg: 'R2U2R2',
                            masktype: 'f2l'
                },
            playerconfig : {
                enable: true,
                hide: true,
                autoplay: false,
                loop: true,
                hoverplay: false,
                speed: 'x1',
            }
        }
        ]

    // @Ref('cube1')  cube1!: VisualCube
    // @Ref('cube2')  cube2!: VisualCube

    mounted(){
        console.log(this.$cuberender)
    }
}
</script>


<style scoped>

</style>