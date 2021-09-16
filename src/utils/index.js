import { Button } from 'vant';
const MyPlugin ={}

MyPlugin.install = function (Vue, options) {
    Vue.component('VanButton', Button)
    // // 1. 添加全局方法或 property
    // Vue.myGlobalMethod = function () {
    //   // 逻辑...
    // }

    // // 2. 添加全局资源
    // Vue.directive('my-directive', {
    //   bind (el, binding, vnode, oldVnode) {
    //     // 逻辑...
    //   }
    //   ...
    // })

    // // 3. 注入组件选项
    // Vue.mixin({
    //   created: function () {
    //     // 逻辑...
    //   }
    //   ...
    // })

    // // 4. 添加实例方法
    // Vue.prototype.$myMethod = function (methodOptions) {
    //   // 逻辑...
    // }
}
export default MyPlugin