// 包含n个接口请求函数的模块

import ajax from './ajax'

//1. 根据经纬度获取位置
export const reqAddress = (latitude, longitude) => ajax(`/position/${latitude},${longitude}`)

//2. 获取食品分类列表
export const reqCategorys = () => ajax('/index_category',{
    headers:{
        needCheck:true
    }
})

//3. 根据经纬度获取商家列表
// export const reqShops = ({latitude, longitude}) => ajax('/shops', {params:{latitude, longitude}})
export const reqShops = ({latitude, longitude}) => ajax('/shops', {
    params:{longitude, latitude},
    headers:{
        needCheck:true
    }
})

//4. 发送短信验证码
export const reqSendCode = (phone) => ajax.get('/sendcode',{params: {phone}})

//5. 短信验证码登录
export const reqSmsLogin = ({phone,code}) => ajax.post('/login_sms',{phone,code})

//6. 账号密码登录
export const reqPwdLogin = ({name,password,captcha}) => ajax.post('/login_pwd',{name,password,captcha})

//7.自动登录
export const reqAutoLogin = () => ajax.get('/auto_login')


