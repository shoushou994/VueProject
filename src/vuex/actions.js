// 包含n个用于间接更新状态数据的方法的对象
// 方法可以包含异步和逻辑处理代码

import { 
    reqAddress, 
    reqCategorys, 
    reqShops, 
    reqAutoLogin, 
    reqShopGoods, 
    reqShopRatings, 
    reqShopInfo 
} from "../api"

import {
    RECEIVE_ADDRESS, 
    RECEIVE_CATEGORYS, 
    RECEIVE_SHOPS, 
    RECEIVE_USER, 
    RECEIVE_TOKEN,
    RESET_USER,
    RESET_TOKEN,
    RECEIVE_GOODS,
    RECEIVE_RATINGS,
    RECEIVE_INFO
} from './mutation-types'

export default {
    // 获取当前地址信息对象的异步action
    async getAddress({commit,state}){
        const {latitude,longitude} = state
        const result = await reqAddress(latitude,longitude)
        if(result.code === 0){
            const address = result.data
            commit(RECEIVE_ADDRESS, address)
        }
    },

    //获取食品分类列表的异步action
    async getCategorys({commit}){
        const result = await reqCategorys()
        if(result.code === 0){
            const categorys = result.data
            commit(RECEIVE_CATEGORYS, categorys)
        }
    },

    //获取商家列表的异步action
    async getShops({commit,state}){
        const {latitude,longitude} = state
        const result = await reqShops({latitude,longitude})
        if(result.code === 0){
            const shops = result.data
            commit(RECEIVE_SHOPS, shops )
        }
    },

    //保存用户信息的异步action
    saveUser({commit},user){
        const token = user.token
        localStorage.setItem('token',token)  //将token保存到localStorage
        //将user和token保存到state中
        commit(RECEIVE_USER, user)  
        commit(RECEIVE_TOKEN, token)
    },

    //自动登录
    async autoLogin({commit,state}){
        //有token且没有user的信息时发请求
        if(state.token && !state.user._id){
            const result = await reqAutoLogin()
            if(result.code===0){
                const user = result.data
                commit(RECEIVE_USER,user)
            }
        }
    },
    //退出登录
    logout({commit}){
        localStorage.removeItem('token')
        commit(RESET_USER)
        commit(RESET_TOKEN)
    },

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
    }
}