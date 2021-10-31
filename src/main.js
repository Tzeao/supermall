import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toast from 'common/toast/index'

Vue.config.productionTip = false
    // 通过原型 创建一个$bus
Vue.prototype.$bus = new Vue()

// 安装Toast插件
Vue.use(toast)

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')