import space2Component from './space.vue';
const space={
        install:function (Vue){
            Vue.component('space',space2Component)//控制组件标签
        }
}
export default space