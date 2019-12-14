<template>
  <div>
    <mt-tabbar fixed>
      <mt-tab-item id="首页">
        <router-link class="list-group-item" :class="{on: $route.path === '/msite'}" to="/msite">
          <p class="iconfont">&#xe618;</p>
          首页
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="搜索">
        <router-link class="list-group-item" :class="{on: $route.path === '/search'}" to="/search">
          <p class="iconfont">&#xe654;</p>
          搜索
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="订单">
        <router-link class="list-group-item" :class="{on: $route.path === '/order'}" to="/order">
          <p class="iconfont">&#xe606;</p>
          订单
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="个人">
        <router-link class="list-group-item" :class="{on: $route.path === '/profile'}" to="/profile">
          <p class="iconfont">&#xe611;</p>
          个人
        </router-link>
      </mt-tab-item>
    </mt-tabbar>

  </div>
</template>


<script>
  import Msite from '../../pages/msite/Msite'
  import Search from '../../pages/search/Search'
  import Order from '../../pages/order/Order'
  import Profile from '../../pages/profile/Profile'

  export default {
    name: 'app',
    components: {
      Msite,
      Search,
      Order,
      Profile,
    }
  }
</script>


<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"

  .on
    color $green
  .iconfont
    font-size 30px
  
</style>
