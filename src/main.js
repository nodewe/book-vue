import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import touch from "vue-directive-touch"
import Vuelazy from "vue-lazyload"
Vue.use(Vuelazy)
Vue.use(touch)
//引入axios
import { token } from "./assets/js/apis/token"
//在vue原型对象中添加一个token函数
Vue.prototype.token=token
//配置axios的基础信息 
//允许携值
//引入Mintui组件
// import Mintui from 'mint-ui';
// import 'mint-ui/lib/style.min.css';
//引入vant组件
import Vant from "vant"
//引入样式
import "vant/lib/index.css"
//子vue中注册该组件
Vue.use(Vant)
//导入
import Tabbar from "./components/tabbar.vue"
Vue.component("my-tabbar",Tabbar)
//在vue组件中注册Mintui组件
// Vue.use(Mintui);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
