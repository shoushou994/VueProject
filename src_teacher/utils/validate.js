import Vue from 'vue'
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'
 
// const config = {
//     locale:'zh_CN',
//     fieldsBagName:'fieldBags'
// }    
Vue.use(VeeValidate)


//自定义validate
VeeValidate.Validator.localize('zh_CN', {
    messages: zh_CN.messages,
    attributes: {
        phone: '手机号',
        phoneCode: '短信验证码',
        email:'邮箱',
        password:'密码',
        picCode:'验证码'  //密码登录验证码/图片验证码
    }
})

//自定义验证规则
//1.手机号码
VeeValidate.Validator.extend('phone', {
    validate: value => {
      return /^1\d{10}$/.test(value)
    },
    getMessage: field => field + '必须是11位手机号码'
})

//2. 手机验证码
VeeValidate.Validator.extend('phoneCode', {
    validate: value => {
      return /^\d{1}$/.test(value)
    },
    getMessage: field => field + '是必须的'
})
//3. 邮箱
VeeValidate.Validator.extend('email', {
    validate: value => {
      return /^[a-z0-9]+$/i.test(value)
    },
    getMessage: field => field + '是必须的'
})
//4. 密码
VeeValidate.Validator.extend('password', {
    validate: value => {
      return /^\d{1,}$/.test(value)
    },
    getMessage: field => field + '是必须的'
})
//5. 验证码
VeeValidate.Validator.extend('picCode', {
    validate: value => {
      return /^[a-zA-Z0-9]+$/i.test(value)
    },
    getMessage: field => field + '是必须的'
})