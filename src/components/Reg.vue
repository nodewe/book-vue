<template>
        <div class="Reg">
        
        <!-- 页头导航 -->
        <van-nav-bar class="zhuce" title="注册" left-arrow @click-left="onClickLeft">
           
        </van-nav-bar>
        <div class="logo">
            <img src="imgs/booklogo.png" alt="">
        </div>
         <!-- 注册信息 -->
         <div class="Reg-info">
             <!-- 昵称 -->
             <div id="nickname">
                <van-field v-model="nickname" @blur.native.capture="checkNickUname" placeholder="请输入2~10位昵称"/>
             </div>
             <!-- 手机号的表单input控件 -->
             <div id="phone">
             <van-field v-model="phone" maxlength="11"  @blur.native.capture="checkphone" placeholder="请输入手机号" />
             </div>
            <!-- 密码的表单控件 -->
            <div id="password">
                <van-field v-model="upwd" @blur.native.capture="checkupwd" :type="isShow" placeholder="请输入6~20位密码"/>
                <div @click="showOrHide" class="iconfont position" :class="eye"></div>
              </div>
           <!-- 验证码的样式 -->
            <div id="authCode">
                 <van-field v-model="code" @blur.native.capture="codeBulr"  class="Code" placeholder="请输入验证码"/>
                 <canvas id="canvas" @click="canvas"></canvas>
            </div>
        <!-- 注册按钮 -->
        </div>
        <!-- 下一步按钮 -->
        <div id="NextFather">
            <van-button id="Next"  @click="reg" type="primary">注册</van-button>
        <!-- <mt-button type="primary" @click="reg" size="large">注册</mt-button> -->
        </div>

        <!--复选框 -->
        <label id="isAgreen" for="">
                <van-checkbox v-model="checked"></van-checkbox>
                同意
                <router-link to="/Priv">《用户服务协议》</router-link>
        </label>

       
    </div>
</template>
<script>
//将封装好的请求函数 引入注册组件中
//      注册 验证码 手机
import { reg,code,Phone } from '../assets/js/apis/user'
//引入函数
import { mapMutations } from "vuex"
//引入vue 自定义指令
import Vue from 'vue'
Vue.directive("myfocus",{
    inserted(elem){
        elem.focus()
    }
})
export default {
    data(){
        return{
            // 昵称
            nickname:"",
            // 用户输入验证码
            code:"",
            //随机验证码
            isCode:"",
            //用户输入手机号
            phone:"",
            //用户输入密码
            upwd:'',
            //密码的显示与隐藏 默认是隐藏
            isShow:"password",
            //控制眼睛的状态 默认是隐藏
            eye:"iconyincang",
            //复选框的值
            checked:false,
            isPhone:true

        }
    },
    mounted(){//挂载阶段之后执行
        this.canvas()
    },
    methods:{
        //引入函数
        ...mapMutations([
            "setUid",
        ]),
        // 点击左箭头进入登录页面
        onClickLeft(){
            this.$router.push("/login")
        },
        //canvas的方法
        canvas(){
            code().then(res=>{
                //console.log(res)
                //获取canvas元素对象
                let canvas=document.getElementById("canvas")
                //设置宽高
                canvas.width=80
                canvas.height=30
                // 设置画布类型
                let ctx=canvas.getContext('2d');
                this.isCode=res
                // /设置字体大小
                ctx.font="20px 黑体"
                //设置颜色
                ctx.fillStyle="#f00"
                //画出字体
                ctx.fillText(this.isCode,20,20)
            })
            
        },
        //昵称失去焦点的状态
        checkNickUname(){
             //声明一个正则表达式
             let reg = /^\w{2,10}$/
            if(!reg.test(this.nickname)){//如果输入不合法就提示
                this.$toast({
                    message:"请输入正确的格式昵称",
                    position:"top",
                })
                return false;
            }else{
                return true;
            }
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
        //封装一个随机生成验证码的函数 在组件初始化和 点击验证码的时候更新
  
        //检测手机号
        checkphone(){
            //获取手机后的值
           
            //定义一个手机号正则
            let reg=/^1[3-9]\d{9}$/;
            if(reg.test(this.phone)){
                Phone(this.phone).then(res=>{
                    if(res==1){//如果查找到了这个手机号就说明已存在
                        this.$toast({
                            message:"手机号已存在",
                            position:"top",
                        })
                        this.isPhone=false;
                    }
                   // console.log(this.phone)
                        this.isPhone =true;
              }) 
               
            }else{
                this.$toast({
                    message:"手机号格式不正确",
                    position:"top",
                })
                return false;
            }
        },
        //检测密码
        checkupwd(){
            //获取密码的值
            //定义一个包含字符和数字组合的正则表达式
            let upwdReg=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
            if(upwdReg.test( this.upwd)){
                this.Upwd="success";
                return true;
            }else{
                this.Upwd="error";
                this.$toast({
                    message:"密码格式不正确",
                    position:"top",
                });
                return false;
            }
        },
        //验证码 失去焦点非空事件
        codeBulr(){
            if(!this.code.trim()){//为空的时候
                 this.$toast({
                    message:"验证码填写不能为空",
                    position:"top",
                 });
                 return false;
            }else{
                return true;
            }
        },
        //注册事件
        reg(){
            //如果用户未选中就提示请同意用户协议
            if(!this.checked){
                this.$toast({
                    message:"请同意用户协议",
                    position:"top",
                 });
                 return;
            };
             //判断验证码是否与随机验证码相等
             if(this.code!=this.isCode){
                 this.$toast({
                    message:"验证码填写不正确",
                    position:"top",
                 });
                 return;
             };
            // console.log(this.checkphone())
             //如果都格式都正确的话            
            if(this.checkNickUname() && this.isPhone && this.checkupwd() && this.codeBulr()){
               // console.log(11111111)
                let obj={//将用户名和密码保存在一个对象中
                    phone:this.phone,
                    upwd:this.upwd,
                    nickname:this.nickname
                };
                //发送请求
                reg(obj).then(res=>{
                    if(res!=0){//注册成功
                        //将用户名保存在localStroge中
                       localStorage.setItem("token",res.token)
                        //let uid = localStorage.getItem("uid");
                        //将用户名存储在uname中
                        //this.setUid(uid)
            /*
             描述: 这里可以做个优化
             作者: Math Object
             日期: 2020-09-16 13:30:17
            */
        
                         //跳到个人中心
                         this.$router.push("/person");
                    }
                })
            }
        }
         
    }
}
</script>
<style>
/* 导航栏上的标题大小 */
 .Reg .van-nav-bar__title{
     color:#743481 !important;
     font-size:24px !important;
    padding:15px 0;
 }
 /* 重写箭头的样式 */
 .Reg .van-nav-bar__arrow{
     font-size:24px !important;
     color:#743481 !important;
 }
.Reg .logo{
     text-align:center;
 }
 /* logo图片 */
 .Reg .logo>img{
   width:200px;
   height:200px;
 }
 /* 用户名表单样式结束 */
.Reg .Reg-info #nickname,.Reg-info #phone{
     width:70% !important;
     margin:0 auto;
     font-size:18px;
 }
  .Reg .Reg-info .van-cell{
    border-bottom:1px solid #743481;
 }


 /* 用户名的表单控件样式结束 */
 /* 密码的表单控件样式开始 */
.Reg  #password{
     width:70%;
     position:relative;;
     margin:0 auto;
 }
 .Reg #password .van-cell{
      margin:0;
      /* width:100% !important; */
  }
 .Reg #password .position{
      position:absolute;
      top:calc(50% - 8px);
      right:0;
  }
  /* 密码的表单控件样式结束 */
  /* 验证码的控件样式开始 */
.Reg #authCode{
    width:70%;
    position:relative;;
    margin:0 auto;
  }
.Reg #canvas{
      position:absolute;
      background-color:darkgray !important;
      top:9px;
      right:0px;
  }
  /* 控件 input的高度 */
    .Reg #authCode .van-field__control{
        height:24PX;
    }
   .Reg #authCode .van-cell {
        margin:0;
 }
/* 验证码控件结束 */
/* 注册按钮样式 */
 .Reg #NextFather{
   position: relative;;
   height:100px;
}
.Reg  #Next{
     border:0;
     width:60%;
      /* position:relative; */
     position: absolute;;
     /* margin:0 auto; */
     left:calc(50% - 115px);
     letter-spacing:3px;
     margin-top:40px;
     background-color:#743481;
 }
 /* 注册按钮结束 */
/* 复选框选中的按钮样式 */
 .Reg .van-checkbox__icon--checked .van-icon{
     background-color:#743481 !important;
     border-color:#743481 !important;
 }
 .Reg #isAgreen{
     display:flex;
     justify-content:center;
     align-items:center;
 }
 .Reg .van-checkbox__icon{
     margin-right:10px;
 }
 
</style>
