
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
    RECEIVE_INFO,
} from './mutation-types'

export default {
    [RECEIVE_ADDRESS] (state, address){
        state.address = address
    },
    [RECEIVE_CATEGORYS] (state, categorys){
        state.categorys = categorys
    },
    [RECEIVE_SHOPS] (state, shops){
        state.shops = shops
    },
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
    [RECEIVE_GOODS] (state,{goods}){
        state.goods = goods
    },
    [RECEIVE_RATINGS] (state,{ratings}){
        state.ratings = ratings
    },
    [RECEIVE_INFO](state,{info}){
        state.info = info
    }
}