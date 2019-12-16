<template>
    <div class="star" :class="`star-${size}`">
        <span class="star-item" v-for="(sc,index) in starClasses" :key="index" :class="sc"></span>
    </div>
</template>

<script type="text/ecmascript-6">
    import { mapState } from 'vuex'

    const STAR_ON = 'on'
    const STAR_HALF = 'half'
    const STAR_OFF = 'off'

    export default {
        props:{
            score:Number,
            size:Number
        },

        computed:{
            ...mapState(['shops']),
            //评分星星数组
            starClasses(){
                const starCS = []
                const {score} = this
                const scoreInt = Math.floor(score)

                //添加类名STAR_ON
                for (let i = 0; i < scoreInt; i++) {
                starCS.push(STAR_ON)
                }
                //添加类名STAR_HALF
                if (score*10 - scoreInt*10 >= 5) {
                starCS.push(STAR_HALF)
                }
                //添加类名STAR_OFF
                while (starCS.length < 5) {
                starCS.push(STAR_OFF)
                }

                return starCS
            }
        },
        mounted(){
            this.$store.dispatch('getShops')
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .star //2x图 3x图
        float left
        font-size 0
        .star-item
        display inline-block
        background-repeat no-repeat
        &.star-48
            .star-item
                width 20px
                height 20px
                margin-right 22px
                background-size 20px 20px
                &:last-child
                    margin-right: 0
                &.on
                    bg-image('./images/stars/star48_on')
                &.half
                    bg-image('./images/stars/star48_half')
                &.off
                    bg-image('./images/stars/star48_off')
        &.star-36
            .star-item
                width 15px
                height 15px
                margin-right 6px
                background-size 15px 15px
                &:last-child
                    margin-right 0
                &.on
                    bg-image('./images/stars/star36_on')
                &.half
                    bg-image('./images/stars/star36_half')
                &.off
                    bg-image('./images/stars/star36_off')
        &.star-24
            .star-item
                width 10px
                height 10px
                margin-right 3px
                background-size 10px 10px
                &:last-child
                    margin-right 0
                &.on
                    bg-image('./images/stars/star24_on@2x.png')
                &.half
                    bg-image('./images/stars/star24_half@2x.png')
                &.off
                    bg-image('./images/stars/star24_off@2x.png')
                    
 
</style>
