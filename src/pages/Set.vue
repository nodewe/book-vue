<template>
    <div id="Set">
        <van-nav-bar
            title="设置"
            left-arrow
            @click-left="onClickLeft"
            />
        <van-cell @click="toUpdateUpwd" title="账户信息" is-link />
        <!-- 登录按钮和退出注销的 -->
        <div id="btn">
            <div v-if="!uid">  
                <van-button @click="toLogin" id="login" plain type="primary">登录</van-button>
             </div>
             <div v-else>  
              <van-button id="loginout" @click="loginout" plain type="primary">退出登录</van-button>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState,mapMutations  } from "vuex"
export default {
    //将vuex中的变量映射到该组件内
    computed:{
        ...mapState([
            "uid"
        ])
    },
    data(){
        return{

        }
    },
    methods:{
        //点击进到修改密码页面修改密码的界面
        toUpdateUpwd(){
            // 如果没有登录的情况下跳转发到登录页面
            if(!this.uid){this.$router.push("/login");return }
            this.$router.push("/accountinfo")
        },
        //点击左箭头返回个人中心页面
        onClickLeft(){
            this.$router.push("/person")
        },
        //点击登录
        toLogin(){
            this.$router.push("/login")
        },
        //点击退出登录
        loginout(){
            // 清除localStroage中的变量
            localStorage.clear();
            this.$router.push("/person")

        }
    }
}
</script>
<style>
/* 返回图标的格式 */
  #Set .van-icon-arrow-left{
      font-size:20px !important;
      color:#743481;

  }
  #Set .van-cell--clickable{
        width:100% !important;
        height:50px;
    }
 #btn>div{
     display:flex;
     justify-content:center;
 }
   .van-button--plain{
       display:block;
        width:80%;
        /* margin:0 auto !important; */
        margin-top:50px !important;
        border:1px solid #743481 !important;
        color:#743481 !important;
   }
   #loginout .van-button__text{
       color:red !important;
   }

</style>