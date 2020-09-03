import Vue from 'vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.less'
import Antd from 'ant-design-vue'
Vue.config.productionTip = false
Vue.use(Antd)
new Vue({
  render: h => h(App),
}).$mount('#app')
