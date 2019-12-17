<template>
    <section class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">点点外卖</h2>
          <div class="login_header_title">
            <a href="javascript:;" :class="{on:isSmsLogin}" @click="isSmsLogin=true">短信登录</a>
            <a href="javascript:;" :class="{on:!isSmsLogin}" @click="isSmsLogin=false">密码登录</a>
          </div>
        </div>
        <div class="login_content">
          <form>
            <div :class="{on:isSmsLogin}">
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机号" v-model="phone" name="phone" v-validate="'required|phone'">
                <button :disabled="!isRightPhone || computeTime>0" class="get_verification" :class="{right_phone_number:isRightPhone}" @click.prevent="sendCode">
                  {{computeTime>0 ? `短信已发送(${computeTime}s)` : '获取验证码'}}</button>
                <span style="color: red;" v-show="errors.has('phone')">{{ errors.first('phone') }}</span>
              </section>
              <section class="login_verification">
                <input type="tel" maxlength="8" placeholder="验证码"  v-model="code" name="code" v-validate="{required:true,regex:/^\d{6}$/}">
                <span style="color: red;" v-show="errors.has('code')">{{ errors.first('code') }}</span>
              </section>
              <section class="login_hint">
                温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
                <a href="javascript:;">《用户服务协议》</a>
              </section>
            </div>
            <div :class="{on: !isSmsLogin}">
              <section>
                <section class="login_message">
                  <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name" name="name" v-validate="'required'">
                  <span style="color: red;" v-show="errors.has('name')">{{ errors.first('name') }}</span>
                </section>
                <section class="login_verification">
                  <input :type="isShowPwd ? 'text' : 'password'" maxlength="8" placeholder="密码" v-model="password" name="password" v-validate="'required'">
                  <div class="switch_button " :class="isShowPwd ? 'on' : 'off'" @click="isShowPwd = !isShowPwd">
                    <div class="switch_circle" :class="{right:isShowPwd}"></div>
                    <span class="switch_text">{{isShowPwd ? 'xxx' : ''}}</span>
                  </div>
                  <span style="color: red;" v-show="errors.has('password')">{{ errors.first('password') }}</span>
                </section>
                <section class="login_message">
                  <input type="text" maxlength="11" placeholder="验证码" v-model="captcha" name="captcha" v-validate="{required:true,regex:/^[0-9a-zA-Z]{4}$/}">
                  <!-- <img class="get_verification" src="/api/captcha" alt="captcha">  //代理服务器处理404问题-->
                  <!-- 是跨域的HTTP请求，不是Ajax请求，没有跨域问题 -->
                  <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha" @click="updateCaptcha" ref="captcha">
                  <span style="color: red;" v-show="errors.has('captcha')">{{ errors.first('captcha') }}</span>
                </section>
              </section>
            </div>
            <button class="login_submit" @click.prevent="login">{{$t('login_login')}}</button>
          </form>
          <a href="javascript:;" class="about_us">{{$t('login_aboutUs')}}</a>
        </div>
        <a href="javascript:" class="go_back" @click="$router.replace('/profile')">
          <i class="iconfont icon-jiantou2"></i>
        </a>
        <button @click="toggleLanguage">中英切换</button>
      </div>
    </section>
</template>

<script type="text/ecmascript-6">
  import {Toast, MessageBox} from 'mint-ui';
  export default {
    data(){
      return {
        isSmsLogin: true,  //是否是短信登录
        phone: '',  //手机号
        code: '',  //短信验证码
        name:'',  //用户名
        password:'',  //密码
        captcha:'',  //密码登录验证码/图片验证码
        isShowPwd:false,  //是否显示密码
        computeTime: 0,  //计时所剩时间
      }
    },
    computed:{
      isRightPhone(){
        return /^1\d{10}$/.test(this.phone)
      }
    },
    methods: {
      async sendCode(){
        this.computeTime = 60
        const timer = setInterval(()=>{
          this.computeTime--
          if (this.computeTime <= 0) {
            this.computeTime = 0
            clearInterval(timer)
          }
        },1000)

        //发请求
        const result = await this.$API.reqSendCode(this.phone)
        console.log(result);
        if (result.code === 1) {  //成功
          Toast('短信验证码已发送')
        } else {  //失败
          this.computeTime = 0
          MessageBox('提示', result.msg)
        }
      },

      async login(){
        // 对指定的所有表单项进行验证
        let success 
        if(this.isSmsLogin){
          success = await this.$validator.validateAll(['phone', 'code']) 
        }else{
          success = await this.$validator.validateAll(['name', 'password', 'captcha']) // 对指定的所有表单项进行验证
        }
        //验证通过，发送登录请求
        let result 
        if (success) {
          const {isSmsLogin, phone, code, name, password, captcha} = this
          if (isSmsLogin) {
            result = await this.$API.reqSmsLogin({phone, code})
          } else {
            result = await this.$API.reqPwdLogin({name, password, captcha})
            this.captcha = ''
            this.updateCaptcha()
          }
        }
        console.log(result);
        //请求结果
        if (result.code===0) {
          const user = result.data
          this.$store.dispatch('saveUser',user)
          this.$router.replace('/profile')
        } else {
          MessageBox('提示',result.msg)
        }
      },
      //更新图片验证码
      updateCaptcha(){
        this.$refs.captcha.src = 'http://localhost:4000/captcha?time' + Date.now()
      },
      //切换语言
      toggleLanguage(){
        const locale = this.$i18n.locale==='en' ? 'zh_CN' : 'en'
        this.$i18n.locale = locale
        localStorage.setItem('locale_key', locale) //保存到local中
      }
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixins.styl'
    .loginContainer
      width 100%
      height 100%
      background #fff
      .loginInner
        padding-top 60px
        width 80%
        margin 0 auto
        .login_header
          .login_logo
            font-size 40px
            font-weight bold
            color #02a774
            text-align center
          .login_header_title
            padding-top 40px
            text-align center
            >a
              color #333
              font-size 14px
              padding-bottom 4px
              &:first-child
                margin-right 40px
              &.on
                color #02a774
                font-weight 700
                border-bottom 2px solid #02a774
        .login_content
          >form
            >div
              display none
              &.on
                display block
              input
                width 100%
                height 100%
                padding-left 10px
                box-sizing border-box
                border 1px solid #ddd
                border-radius 4px
                outline 0
                font 400 14px Arial
                &:focus
                  border 1px solid #02a774
              .login_message
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .get_verification
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  border 0
                  color #ccc
                  font-size 14px
                  background transparent
                  &.right_phone_number
                    color #000
              .login_verification
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .switch_button
                  font-size 12px
                  border 1px solid #ddd
                  border-radius 8px
                  transition background-color .3s,border-color .3s
                  padding 0 6px
                  width 30px
                  height 16px
                  line-height 16px
                  color #fff
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  &.off
                    background #fff
                    .switch_text
                      float right
                      color #ddd
                  &.on
                    background #02a774
                  >.switch_circle
                    //transform translateX(27px)
                    position absolute
                    top -1px
                    left -1px
                    width 16px
                    height 16px
                    border 1px solid #ddd
                    border-radius 50%
                    background #fff
                    box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                    transition transform .2s
                    &.right
                      transform translateX(27px)
              .login_hint
                margin-top 12px
                color #999
                font-size 14px
                line-height 20px
                >a
                  color #02a774
            .login_submit
              display block
              width 100%
              height 42px
              margin-top 30px
              border-radius 4px
              background #4cd96f
              color #fff
              text-align center
              font-size 16px
              line-height 42px
              border 0
          .about_us
            display block
            font-size 12px
            margin-top 20px
            text-align center
            color #999
        .go_back
          position absolute
          top 5px
          left 5px
          width 30px
          height 30px
          >.iconfont
            font-size 20px
            color #999
       
</style>
