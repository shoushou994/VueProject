
import axios from 'axios'
import qs from 'qs'
import store from '@/vuex/store'
import {Indicator,Toast,MessageBox} from 'mint-ui'
import router from '@/router'

const instance = axios.create({
    baseURL:'/api',
    timeout:30000
})

//请求拦截器
instance.interceptors.request.use((config) => {
    Indicator.open() //请求加载效果
    const data = config.data
    if(data instanceof Object){
        config.data = qs.stringify(data)
    }
    // 通过请求头携带token数据
    const token = store.state.token
    if (token) {  //有token，就携带，
        config.headers['Authorization'] = token
    } else {
        //没有token，但需要token校验，不发请求
        if (config.headers.needCheck) {
            throw new Error('没有登录，不能发请求获取信息')
        }
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
        //如果error中没有response
        if (!error.response && router.currentRouter.path!=='login') {
            router.replace('/login')
            Toast('请求异常'+ error.message)
        } else{  //如果error中有response
            //status为: 401: token过期
            if (error.response.status===401 ) {
                if (router.currentRouter.path!=='login') {
                    store.dispatch('logout')
                    router.replace('/login')
                    Toast(error.response.data.message || '登录过期，请重新登录')
                }
            }else if (error.response.status===404) {  //tatus为: 404: 提示访问的资源不存在
                MessageBox('提示','访问的资源不存在')
            } else{  //请求异常
                MessageBox('提示','请求出错：'+ error.message)
            }
        }
        return new Promise(()=>{})
    }
)
export default instance
