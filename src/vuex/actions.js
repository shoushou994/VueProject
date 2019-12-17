// 包含n个用于间接更新状态数据的方法的对象
// 方法可以包含异步和逻辑处理代码

import { reqAddress, reqCategorys, reqShops, reqAutoLogin } from "../api"
import {
    RECEIVE_ADDRESS, 
    RECEIVE_CATEGORYS, 
    RECEIVE_SHOPS, 
    RECEIVE_USER, 
    RECEIVE_TOKEN,
    RESET_USER,
    RESET_TOKEN
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
    }
}