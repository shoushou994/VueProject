
import Vue from 'vue'

//保存指定商家的购物车数据到sessionStorage
export function saveCartFoods(shopId, cartFoods){
    //生成包含所有count数量的对象容器
    const cartCounts = cartFoods.reduce((pre, food) => {
        pre[food.id] = food.count
        return pre 
    }, {})
    //保存到settionStorage
    sessionStorage.setItem(shopId, JSON.stringify(cartCounts))
}

//读取cartCounts, 生成并返回一个cartFoods
export function getCartFoods(shop){
    const cartFoods = []
    const cartCounts = JSON.parse(sessionStorage.getItem(shop.id)) || {}
    shop.goods.forEach(good => {
        good.foods.forEach(food => {
            const count = cartCounts[food.id]
            if (count > 0) {
                // food.count = count
                Vue.set(food, 'count', count)
                cartFoods.push(food)
            }
        })
    });

    return cartFoods
}
