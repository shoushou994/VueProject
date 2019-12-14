import Vue from 'vue'
import 'lib-flexible/flexible'
import {Tabbar, TabItem} from 'mint-ui'
import App from './App.vue'
import router from './router'
import Header from './components/header/Header.vue'
import store from './vuex/store'


Vue.config.productionTip = false

Vue.component('Header',Header)
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')



/*
*  // new Vue({
* //   el:'#app',
* //   components:{App},
* //   template: '<App/>',
* //   router
* // })
*/
