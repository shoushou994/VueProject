// 包含n个接口请求函数的模块

import ajax from './ajax'

//1. 根据经纬度获取位置
export const reqAddress = (latitude, longitude) => ajax(`/position/${latitude},${longitude}`)

//2. 获取食品分类列表
export const reqCategorys = () => ajax('/index_category')

//3. 根据经纬度获取商家列表
// export const reqShops = ({latitude, longitude}) => ajax('/shops', {params:{latitude, longitude}})
export const reqShops = ({latitude, longitude}) => ajax('/shops', {params:{longitude, latitude}})

