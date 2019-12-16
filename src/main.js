import Vue from 'vue'
import 'lib-flexible/flexible'
import {Tabbar, TabItem} from 'mint-ui'
import App from './App.vue'
import router from './router'
import Header from './components/header/Header.vue'
import store from './vuex/store'
import './utils/validate'
import i18n from './i18n'


Vue.config.productionTip = false

Vue.component('Header',Header)
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);

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
