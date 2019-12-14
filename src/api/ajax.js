
import axios from 'axios'
import qs from 'qs'

const instance = axios.create({
    timeout:10000
})

//请求拦截器
instance.interceptors.request.use(()=>{
    console.log('req interceptor');
    const data = config.data
    if(data instanceof Object){
        config.data = qs.stringify(data)
    }

    return config
})

//响应拦截器
instance.interceptors.response.use(()=>{
    response =>{
        console.log('res interceptor');
        return response.data
    },
    error =>{
        alert('请求异常'+ error.message)
        return new Promise(()=>{})
    }
    
})
export default instance
