import Vue from 'vue'
import 'lib-flexible/flexible'
import {Tabbar, TabItem, Button} from 'mint-ui'
import App from './App.vue'
import router from './router'
import Header from './components/header/Header.vue'
import Star from './components/star/Star.vue'
import store from './vuex/store'
import './utils/validate'  //引入表单验证
import i18n from './i18n'  //国际化
import * as API from '@/api'

Vue.prototype.$API = API //将API对象挂载到Vue原型对象上
Vue.config.productionTip = false //关闭提示

Vue.component('Header',Header)
Vue.component('Star',Star)

Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
Vue.component(Button.name, Button);  

new Vue({
  render: h => h(App),
  router,
  i18n,
  store
}).$mount('#app')



/*
*  // new Vue({
* //   el:'#app',
* //   components:{App},
* //   template: '<App/>',
* //   router
* // })
*/
