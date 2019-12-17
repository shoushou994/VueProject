//包含n个状态数据属性的对象

export default {
    latitude: 40.10038,
    longitude: 116.36867,
    address: {},  //地址
    categorys: [],  //食品分类列表
    shops: [],  //商家列表
    user:{},  //保存用户
    token: localStorage.getItem('token') || '',
    goods: [],  //商品列表
    ratings:[],  //评论列表
    info:{}  //商家信息
}