import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import fastclick from "fastclick";
import vueLazyLoad from 'vue-lazyload'

Vue.use(vueLazyLoad)
fastclick.attach(document.body)


import '@/common/less/index.less'
import '@/common/font/all/iconfont.css'
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App), 
}).$mount("#app");
