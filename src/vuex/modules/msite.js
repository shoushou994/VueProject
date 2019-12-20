
import { 
    reqAddress, 
    reqCategorys, 
    reqShops
} from "@/api"

import {
    RECEIVE_ADDRESS, 
    RECEIVE_CATEGORYS, 
    RECEIVE_SHOPS
} from '../mutation-types'

export default {
    state:{
        latitude: 40.10038,
        longitude: 116.36867,
        address: {},  //地址
        categorys: [],  //食品分类列表
        shops: [],  //商家列表
    },
    mutations:{
        [RECEIVE_ADDRESS] (state, address){
            state.address = address
        },
        [RECEIVE_CATEGORYS] (state, categorys){
            state.categorys = categorys
        },
        [RECEIVE_SHOPS] (state, shops){
            state.shops = shops
        },
    },
    actions:{
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
    },
    getters:{
        
    }
}