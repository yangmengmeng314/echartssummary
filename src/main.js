import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Router from 'vue-router'
import store from './store'
import Element from 'element-ui'
import * as echarts from 'echarts';
import 'element-ui/lib/theme-chalk/index.css'
import './theme.scss'
import './util/outside'
import 'default-passive-events'

Vue.config.productionTip = false
Vue.use(Element)
Vue.prototype.$echarts = echarts

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
