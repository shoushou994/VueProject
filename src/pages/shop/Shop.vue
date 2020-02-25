<template>
  <div>
    <ShopHeader></ShopHeader>
    <div class="tab">
      <div class="tab-item">
        <router-link :to="`/shop/${id}/goods`" replace>点餐</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="`/shop/${id}/ratings`" replace>评价</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="`/shop/${id}/info`" replace>商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import ShopHeader from '../../components/shopHeader/ShopHeader'
  import {mapState} from 'vuex'
  import {saveCartFoods} from '@/utils/sessionStorage'

  export default {
    props:['id'],
    computed:{
      ...mapState({
        shop: state => state.shop
      })
    },
    mounted(){
      /* this.$store.dispatch('getShopGoods')
      this.$store.dispatch('getShopRatings')
      this.$store.dispatch('getShopInfo') */
      const id = this.id
      this.$store.dispatch('getShop',id)

      //窗口卸载监听， 刷新时保存
      window.addEventListener('unload', ()=>{
        const {shop:{id}, cartFoods} = this.shop  //多层解构
        saveCartFoods(id, cartFoods)
      })
    },
    //退出当前商家页面时保存
    beforeDestroy(){
      const {shop:{id}, cartFoods} = this.shop  //多层解构
      saveCartFoods(id, cartFoods)
    },
   
    components:{
      ShopHeader,
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .tab
    height 40px
    line-height 40px
    background #fff
    bottom-border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      float left
      width: 33.33333%
      text-align center
      font-size 14px
      color rgb(77, 85, 93)
      a
        display block
        position relative
        &.router-link-active
          color #02a774
          &::after
            content ''
            position absolute
            left 50%
            bottom 1px
            width 35px
            height 2px
            transform translateX(-50%)
            background #02a774
 
 
</style>
