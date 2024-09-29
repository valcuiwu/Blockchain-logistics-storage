import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import JsonExcel from 'vue-json-excel'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue2OrgTree from 'vue2-org-tree'
import 'vue2-org-tree/dist/style.css'
Vue.use(Vue2OrgTree)
Vue.use(ElementUI);

Vue.component('downloadExcel', JsonExcel)

Vue.config.productionTip = false

Vue.use(Antd)

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
