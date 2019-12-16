<template>
  <div>
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.isShowFooter"></FooterGuide>
  </div>
</template>


<script>
  import FooterGuide from '@/components/footerGuide/FooterGuide.vue'
  // import {reqAddress} from './api'

  export default {
    async mounted(){
      this.$store.dispatch('getAddress')
      // const result = await reqAddress(40.10038, 116.36867)
      // console.log('result',result);
    },

    name: 'app',
    components: {
      FooterGuide,
    }
  }
</script>


<style lang="stylus" rel="stylesheet/stylus">
  // @import "./common/stylus/mixins.styl"

</style>
