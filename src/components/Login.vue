<template>
    <div id="Login">
       <van-nav-bar class="login" title="登录" left-arrow @click-left="onClickLeft">
        </van-nav-bar>
        <!-- logo部分 -->
        <div class="login-logo">
            <img src="imgs/booklogo.png" alt="">
        </div>
        <!-- 表单控件 -->
        <div id="form">
        <input class="phoneStyle" type="text" v-model="phone" placeholder="请输入手机号">
        <div id="upwd">
            <input class="upwdStyle" :type="isShow" v-model="upwd" placeholder="请输入密码">
            <div @click="showOrHide" class="iconfont" :class="eye"></div>
        </div>
     </div>
    <p class="forget"> 
        <router-link to="/for">忘记密码?</router-link>
    </p>
    <!-- 登录注册按钮 -->
    <div class="btn">
        <van-button @click="Login" plain type="primary">登录</van-button>
        <van-button @click="toReg" type="primary">注册</van-button>
    </div>
      <!-- 第三方登录按钮-->
      <div>
          <div id="threeFont">--其他登录方式--</div>
          <div id="threeLogin">
            <router-link to="" class="iconfont iconweixin"></router-link>
            <router-link to="" class="iconfont iconqq"></router-link>
            <router-link to="" class="iconfont icon89"></router-link>
          </div>
      </div>
 </div>
  
</template>
<script>
//导入login 请求函数
import { login } from "../assets/js/apis/user.js";
import { mapState } from "vuex"
import { token } from "../assets/js/apis/token"
export default {
    computed:{
        ...mapState([
            "uid"
        ])
    },
    data(){
        return{
            //用户输入的手机号
            phone:"",
            //用户输入的密码
            upwd:'',
            //检测手机号手机号状态
            phoneState:"",
            //检测密码状态
            upwdState:"",
            //眼睛的状态
             eye:"iconyincang",
             //密码的显示与隐藏 默认是隐藏
            isShow:"password",

        }
    },
    methods:{
        //点击头部的导航栏的左箭头返回
         onClickLeft(){
            this.$router.push("/person")
        },
            //点击密码框的  "小眼睛" 产生的函数
        showOrHide(){
            if(this.isShow=="password"){//点击的时候如果当前状态是隐藏的
                this.eye="iconai-eye";//就显示睁开的眼睛
                this.isShow="text";//并且类型也改为文本
            }else{//反之如果点击的时后当前状态是显示的
                this.eye="iconyincang";//就显示闭眼的图标
                this.isShow="password";//并且类型也改为密码类型
            }
        },
        //点击登录
       Login(){
           if(!this.phone.trim() || !this.upwd.trim()){//如果用户名或者密码为空就提示
                this.$toast({
                    message:"用户名或密码不能为空",
                    position:"top",
                })
                return
           };
           //发送请求
           login(this.phone,this.upwd).then(res=>{
               if(res!=0){
                      this.$toast({
                        message:"登录成功",
                        position:"top",
                    })
                    localStorage.setItem("token",res.token)
                    //获取地址栏中的信息
                    let url = this.$route.query
                    
                    if(url.redirect){//从哪来登录成功跳回哪里去
                       (async ()=>{
                            await token();
                            this.$router.push(url.redirect)
                       })()
                    }else{//没有就默认跳会个人中心
                        this.$router.push("/person")
                    }
                    
               }else{
                   this.$toast({
                        message:"登录失败",
                        position:"top",
                    })
               }
           })
         
       },
        //点击注册
        toReg(){
            this.$router.push("/reg")
        }
    }
}
</script>
<style>
/* 返回图标样式 */
#Login .van-icon-arrow-left{
   font-size:24px !important;
   color:#743481;
}
/* 标题中间的文字 */
 #Login .van-nav-bar__title{
    font-size:24px !important;
    color:#743481;
}
 #Login .login-logo>img{
     display:block;
   width:200px;
   height:200px;
   margin:0 auto;
 }
/* 导航栏样式 */
    #Login .nav{
        background-color:white;
    }

/* 输入框样式 */
   #Login .phoneStyle{
       height:30px;
         display:block;
       width:70%;
       border-bottom:1px solid #743481;
       margin:0 auto;
        margin-top:20px;
        padding:5px 0;
   }
  /* 密码框的样式 */
  #Login #upwd{
        width:70%;
        margin:0 auto;
        height:30px;
        position:relative;
   }
  #Login #upwd>.upwdStyle{
        width:100%;
        display:block;
        border-bottom:1px solid #743481;
        margin-top:20px;
        padding:5px 0;
   }
   #Login #upwd>div{
        position:absolute;
        top:0px;
        right:0px;
    }
   /* 忘记密码 */
   #Login .forget{
       width:70%;
       margin:0 auto;
       margin-top:20px;
       text-align:right;
   }
   #Login .forget a{
      color:gray;
      position: relative;
     text-decoration:none;
   }
   /* 注册登录按钮样式 */
   #Login .btn{
       width:70%;
       margin:0 auto;
       margin-top:-35px;
   }
   #Login .btn button{
       display: block;
        width:100%;
   }
   #Login .btn button:first-child{
       outline:0;
       border:1px solid #743481;
       color: #743481;
   }
   #Login .btn button:last-child{
       outline:0;
       border:0;
       margin-top:10px;
       background-color:#743481;
   }
   /* 第三方登录样式 */
   #Login #threeFont{
       text-align:center;
       color:gray;
       margin-top:30px;
       margin-bottom:10px;
       letter-spacing:2px;
   }
   #Login #threeLogin{
       display:flex;
       justify-content:center;
   }
   #Login #threeLogin>a{
      font-size:32px;
      color:#743481;
   }
   #Login #threeLogin>a:nth-child(2){
       margin:0 30px;
   }
</style>