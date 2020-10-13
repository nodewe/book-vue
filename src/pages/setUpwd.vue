<template>
    <!-- 设置密码 -->
    <div id="setUpwd">
    <!-- 设置密码的详情 -->
        <header id="setUpwd-header">
            <div @click="back" class="iconfont iconfanhui"></div>
            <div>设置密码</div>
        </header>
        <!--  设置密码-->
        <section>
            <div id="oldupwd">
                <!-- 当前密码 -->
                <i class="iconfont iconmima"></i>
                <input v-model="oldUpwd" :type="oldShow" placeholder="请输入当前密码">
                <i class="iconfont" :class="oldeye" @click="oldShowClick"></i>
            </div>
            <div id="newupwd">
                <!-- 新密码 -->
                <i class="iconfont iconmima"></i>
                <input v-model="newUpwd" :type="newShow" placeholder="请输入6~20位密码">
                <i class="iconfont" :class="neweye" @click="newShowClick"></i>
            </div>
            <div id="newcpwd">
                <!-- 重复新密码 -->
                <i class="iconfont iconmima"></i>
                <input v-model="newCpwd" :type="newcShow" placeholder="请再次确认密码">
                <i class="iconfont" :class="newceye" @click="newcShowClick"></i>
            </div>
        </section>
        <!-- 提交按钮 -->
        <button id="update" @click="update">确定修改</button>
    </div>
    
</template>
<script>
import {setUpwd} from "../assets/js/apis/user"
import {mapState,mapMutations} from "vuex"
export default {
    computed:{
        ...mapState([
            "uid"
        ])
    },
    data(){
        return{
            //旧密码
            oldUpwd:"",
            //新密码
            newUpwd:"",
            //重复输入新密码
            newCpwd:"",
            //默认是密码类型
            oldShow:"password",
            newShow:"password",
            newcShow:"password",
            //默认是眼睛是不显示
            oldeye:"iconyincang",
            neweye:"iconyincang",
            newceye:"iconyincang"
        }
    },
    created(){
        //创建阶段发送一次请求获取token
        this.token()
    },
    methods:{
        //点击返回
        back(){
            this.$router.go(-1)
        },
        //确定修改
        update(){
             //密码在6~20且是字母与数字的组合
            let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
            if(!reg.test(this.newUpwd)){
                this.$toast("密码在6~20位之间")
                return;
            }
            //两次密码是否一致
            if(this.newUpwd!=this.newCpwd){
                this.$toast("两次输入密码不一致")
                return
            }
            ///发送axios请求得到当前用户名的密码然后与这个密码对比
            setUpwd(this.uid,this.oldUpwd,this.newUpwd).then(res=>{
                if(res==1){
                    this.$toast("修改成功")
                    //跳回登录页面
                    localStorage.clear();
                    this.$router.push("/login")
                }else{
                    this.$toast("修改失败")
                }
            })
           
        },
        //点击 当前密码的眼睛的显示状态
        oldShowClick(){
            if(this.oldShow=="password"){
                //如果当前状态是 隐藏(密码)状态就显示
                this.oldShow="text"
                this.oldeye="iconai-eye"
            }else{
                //反之点击的时候就是显示状态 就改变
                this.oldShow="password"
                this.oldeye="iconyincang"
            }
        },
        //点击新密码
        newShowClick(){
            if(this.newShow=="password"){
                //如果当前状态是 隐藏(密码)状态就显示
                this.newShow="text"
                this.neweye="iconai-eye"
            }else{
                //反之点击的时候就是显示状态 就改变
                this.newShow="password"
                this.neweye="iconyincang"
            }
        },
        //点击重复输入新密码
         newcShowClick(){
            if(this.newcShow=="password"){
                //如果当前状态是 隐藏(密码)状态就显示
                this.newcShow="text"
                this.newceye="iconai-eye"
            }else{
                //反之点击的时候就是显示状态 就改变
                this.newcShow="password"
                this.newceye="iconyincang"
            }
        },
    }
}
</script>
<style>
 #setUpwd-header{
    display:flex;
    align-items:center;
    position:relative;
    height:60px;
    margin-bottom:30px;
 }
 #setUpwd-header .iconfanhui{
     margin-left:20px;
 }
 #setUpwd-header>div:nth-child(2){
     font-size:24px;
     position:absolute;
     left:50%;
     transform:translate(-50%);
 }
 /* 设置密码样式 */
 #oldupwd,#newupwd,#newcpwd{
     position:relative;
     width:70%;
     margin:0 auto;
     border-bottom:1px solid #743481;
 }
 #setUpwd input{
      padding:13px 0;
     padding-left:22px;
 }
    
 /* 设置按钮的公共样式 */
#setUpwd .iconmima{
    position:absolute;
    right:0;
    top:10px;
    font-size:20px;
 }
 /* 锁 */
 #setUpwd .iconmima{
    left:0;
    top:10px;
    width:20px;
    color:#743481;
 }
  #setUpwd .iconyincang,#setUpwd .iconai-eye{
        position:absolute;
        top:12px;
        right:0;
 }
 /* 提交按钮的样式 */
 #setUpwd #update{
     outline:0;
     border:0;
     display:block;
     width:70%;
     height:40px;
     margin:0 auto;
     margin-top:30px;
     color:white;
     border-radius:5px;
     /* cursor:pointer; */
     background-color:#743481;
 }
</style>