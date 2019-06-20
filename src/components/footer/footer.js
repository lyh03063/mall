import footerComponent from './memberfooter.vue';
const memberfooter = {
    install: function (Vue) {
        Vue.component('memberfooter', footerComponent)//控制组件标签
    }
}
export default memberfooter