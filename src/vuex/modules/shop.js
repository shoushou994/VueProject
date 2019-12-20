import Vue from 'vue'

import { 
    reqShopGoods, 
    reqShopRatings, 
    reqShopInfo 
} from "@/api"

import {
    RECEIVE_GOODS,
    RECEIVE_RATINGS,
    RECEIVE_INFO,
    ADD_FOOD_COUNT,
    REDUCE_FOOD_COUNT,
    CLEAR_CART,
} from '../mutation-types'

export default {
    state:{
        goods: [],  //商品列表
        ratings:[],  //评论列表
        info:{},  //商家信息
        cartFoods:[] //购物车中的食物
    },
    mutations:{
        [RECEIVE_GOODS] (state,{goods}){
            state.goods = goods
        },
        [RECEIVE_RATINGS] (state,{ratings}){
            state.ratings = ratings
        },
        [RECEIVE_INFO](state,{info}){
            state.info = info
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
        //获取商家食品列表
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