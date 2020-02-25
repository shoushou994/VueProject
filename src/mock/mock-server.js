
import Mock from 'mockjs'
import data from './data.json'
import shops from './shops.json'

//定义mock接口
Mock.mock('/api/goods',{code:0, data:data.goods})
Mock.mock('/api/ratings',{code:0, data:data.ratings})
Mock.mock('/api/info',{code:0, data:data.info})

//根据请求的id参数返回对应的商家数据
Mock.mock(/^\/api\/shop\/\d+$/, function(options){  //api/shop/1
    const id = options.url.substring(10)
    const shop = shops.find(shop => shop.id==id)  //找到对应shop
    return Mock.mock({code:0, data:shop || shops[0]}) //返回一个动态数据
})
