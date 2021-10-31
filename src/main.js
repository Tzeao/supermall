import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'

import toast from 'common/toast/index'

Vue.config.productionTip = false
    // 通过原型 创建一个$bus
Vue.prototype.$bus = new Vue()

// 安装Toast插件
Vue.use(toast)

// 解决移动端的300ms 延迟
fastclick.attach(document.body)

// 使用懒加载插件
Vue.use(VueLazyload, {
    // 占位符
    loading: require('assets/img/common/placeholder.png')
})

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')