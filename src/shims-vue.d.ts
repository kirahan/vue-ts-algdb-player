import Vue from 'vue'
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

// 1. 确保在声明补充的类型之前导入 'vue'
// import Vue from 'vue'
// import Vue from 'vue'
import { AxiosInstance } from 'axios';
import { CubeRendererInstance } from './plugins/cubestack/cuber/interface';
// import CubeRenderer { CubeConfig} from './plugins/cubestack/cuber/renderer';

// 2. 定制一个文件，设置你想要补充的类型
//    在 types/vue.d.ts 里 Vue 有构造函数类型
// declare module '../../CubeNodeApiServer/vue-ts-algdb-explorer/node_modules/vue/types/vue' {
declare module 'vue/types/vue' {
// 3. 声明为 Vue 补充的东西
  interface Vue {
    $http: AxiosInstance;
    $cuberender: CubeRendererInstance;
  }
}