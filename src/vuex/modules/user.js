
import {reqAutoLogin} from "@/api"

import { 
    RECEIVE_USER, 
    RECEIVE_TOKEN,
    RESET_USER,
    RESET_TOKEN
} from '../mutation-types'

export default {
    state:{
        user:{},  //保存用户
        token: localStorage.getItem('token') || '',
    },
    mutations:{
        [RECEIVE_USER] (state, user){
            state.user = user
        },
        [RECEIVE_TOKEN] (state, token){
            state.token = token
        },
        [RESET_USER] (state, user){
            state.user = {}
        },
        [RESET_TOKEN] (state, token){
            state.token = ''
        },
    },
    actions:{
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
    },
    getters:{
        
    }
}