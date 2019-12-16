
import axios from 'axios'
import qs from 'qs'
import {Indicator} from 'mint-ui'

const instance = axios.create({
    baseURL:'/api',
    timeout:10000
})

//请求拦截器
instance.interceptors.request.use((config) => {
    Indicator.open() //请求加载效果
    const data = config.data
    if(data instanceof Object){
        config.data = qs.stringify(data)
    }
    return config
})

//响应拦截器
instance.interceptors.response.use(
    response =>{
        Indicator.close()
        return response.data
    },
    error =>{
        Indicator.close()
        alert('请求异常'+ error.message)
        return new Promise(()=>{})
    }
    
)
export default instance
