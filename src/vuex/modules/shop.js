import Vue from 'vue'
import { 
    // reqShopGoods, 
    // reqShopRatings, 
    // reqShopInfo 
    reqShop
} from "@/api"
import {
    // RECEIVE_GOODS,
    // RECEIVE_RATINGS,
    // RECEIVE_INFO,
    RECEIVE_SHOP,
    ADD_FOOD_COUNT,
    REDUCE_FOOD_COUNT,
    CLEAR_CART,
} from '../mutation-types'
import {getCartFoods} from '@/utils/sessionStorage'

export default {
    state:{
        // goods: [],  //商品列表
        // ratings:[],  //评论列表
        // info:{},  //商家信息
        shop:{},  //当前商家
        cartFoods:[] //购物车中的食物
    },
    mutations:{
      /*[RECEIVE_GOODS] (state,{goods}){
            state.goods = goods
        },
        [RECEIVE_RATINGS] (state,{ratings}){
            state.ratings = ratings
        },
        [RECEIVE_INFO](state,{info}){
            state.info = info
        }, */
        
        [RECEIVE_SHOP](state, {shop={}, cartFoods=[]}){
            state.shop = shop
            state.cartFoods = cartFoods
        },
        
        [ADD_FOOD_COUNT](state,{food}){
            if (food.count) {
                food.count++
            } else{  //给响应式对象添加一个新的属性，新属性不是响应式的，
                // food.count=1
                Vue.set(food, 'count', 1)
                state.cartFoods.push(food)  //将当前food添加到购物车
            }
        },
        [REDUCE_FOOD_COUNT](state,{food}){
            if (food.count>0) {
                food.count--
                if (food.count===0) {
                    state.cartFoods.splice(state.cartFoods.indexOf(food), 1) //从购物车中移除
                }
            }
        },
        [CLEAR_CART](state){
            state.cartFoods.forEach(food => food.count = 0);
            state.cartFoods = []  //重置购物车数组
        }
    },
    actions:{
       /*  //获取商家食品列表
        async getShopGoods({commit}, cb){
            const result = await reqShopGoods()
            if (result.code===0) {
                const goods = result.data
                commit(RECEIVE_GOODS, {goods})
                typeof cb === 'function' && cb()
            }
        },
        // 异步获取商家评论列表
        async getShopRatings({commit}, cb) {
            const result = await reqShopRatings()
            if(result.code===0) {
                const ratings = result.data
                commit(RECEIVE_RATINGS, {ratings})
                // 如果组件中传递了接收消息的回调函数, 数据更新后, 调用回调通知调用的组件
                typeof cb === 'function' && cb()
            }
        },
        //获取商家信息
        async getShopInfo({commit}, cb){
            const result = await reqShopInfo()
            if (result.code===0) {
                const info = result.data
                commit(RECEIVE_INFO, {info})
                typeof cb === 'function' && cb()
            }
        }, */
        //获取指定商家
        async getShop({commit,state}, id){
            //如果指定id与原来id相同，不需要发请求
            if (id == state.shop.id) {
                return
            }
            //当前显示另一个商家，清除原本的数据
            if (state.shop.id) {
                commit(RECRIVE_SHOP, {}) //空容器中不带shop对象
            }
            //发请求获取对应商家并更新数据
            const result = await reqShop(id)
            if (result.code===0) {
                const shop = result.data
                const cartFoods = getCartFoods(shop)
                commit(RECEIVE_SHOP, {shop, cartFoods})
            }
            
        },

        //同步更新食品数量
        updateFoodCount({commit}, {food,isAdd}){
            if (isAdd) {
                commit(ADD_FOOD_COUNT, {food})
            }else{
                commit(REDUCE_FOOD_COUNT, {food})
            }
        }
    },
    getters:{
        //总数量
        totalCount(state){
            return state.cartFoods.reduce((preTotal, food) => preTotal + food.count, 0)
        },
        //总价钱
        totalPrice(state){
            return state.cartFoods.reduce((preTotal, food) => preTotal + food.count*food.price, 0)
        }
    }
}