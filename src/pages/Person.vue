<template>
    <div id="Person">
        <!-- 头部的两个图标 -->
        <div class="icon">
            <router-link to="" class="iconfont iconxiaoxi1"></router-link>
            <router-link to="/set" class="iconfont iconshezhi1"></router-link>
        </div>
        <!-- 个人头像部分 -->
        <div id="avator">
            <div v-if="!uid">
                <div><router-link to="/login"><img :src="`${url}/avatar/default.png`" alt=""></router-link></div>
                <div>
                    <h1>立即登录</h1>
                    <h2>欢迎登录人文書馆</h2>
                </div>

            </div>
            <div v-else>
                <!-- 去服务器拿我的头像 -->
                <div @click="update"><img :src="`${url}/avatar/${Person.avatar}`" alt=""></div>
                 <div>
                     <!-- 去服务器拿我的昵称 -->
                    <h1 v-text="Person.nickname"></h1>
                    <h2>欢迎你</h2>
                </div>
                <div id="attention">
                    关注:<span v-text="Person.att"></span>
                    粉丝:<span v-text="Person.fun"></span>
                    </div>
            </div>
        </div>
               <!-- 分割线开始 -->
        <p id="hr"></p>
        <!-- 分割线结束 -->
        <!-- 菜单1 -->
        <div id="menu1">
            <a @click="cloudBook" href="javascript:;">
                <div class="iconfont iconwenjian1"></div>
                <h1>云书馆</h1>    
            </a>
            <a @click="myCreation"  href="javascript:;">
                <div class="iconfont iconchuangzuo"></div>
                <h1>我的创作</h1>  
           </a>
            <a @click="myNote" href="javascript:;">
                <div class="iconfont iconbiji"></div>
                <h1>笔记档案</h1> 
            </a>
        </div>
        <!-- 分割线开始 -->
        <p id="hr"></p>
        <!-- 分割线结束 -->
              <!-- 我的服务 -->
        <div id="myServer">
             <h2>我的服务</h2>
            <a @click="myColl" href="javascript:;">
                <div class="iconfont iconshoucang1"></div>
                <h1>我的收藏</h1>    
            </a>
            <a @click="friend"  href="javascript:;">
                <div class="iconfont iconyaoqinghaoyou"></div>
                <h1>邀请好友</h1>  
            </a>
            <a @click="feedback" href="javascript:;">
                <div class="iconfont iconyijianfankui"></div>
                <h1>意见反馈</h1> 
            </a>
        </div>
        <van-share-sheet
            v-model="showShare"
            title="立即分享给好友"
            :options="options"
            @select="share"
            />
          <!-- tabbar -->
     <my-tabbar></my-tabbar>
    </div>
</template>
<script>
//引入服务器基础路径
import { baseURL } from "../assets/js/apis/url.js"
import { person } from "../assets/js/apis/user"
import { Share } from "../assets/js/apis/share"
//import { token } from "../assets/js/apis/token"
//引入vuex中的state
import { mapState} from "vuex"
export default {
    //在计算属性中拿到vuex中uname这个值
    computed:{
        ...mapState([
            "uid"
        ])
    },
    data(){
        return {
            // 存放服务器基础路径
            url:baseURL,
            //个人信息
            Person:{avatar:"default.png"},
            //点击分享的绑定变量
            showShare:false,
            //分享渠道的管理
            options: [
                [
                    { name: '微信', icon: 'wechat' },
                    { name: '微博', icon: 'weibo' },
                    { name: 'QQ', icon: 'qq' }
                ],
                [
                    { name: '复制链接', icon: 'link' },
                    { name: '分享海报', icon: 'poster' },
                    { name: '二维码', icon: 'qrcode' }
                ],
            ],
        }
    },
    created(){
      (async ()=>{
          await this.token();
         if(this.uid){//已存在uid值时才发送请求
                //加载组件时去数据库拿个人信息
            person(this.uid).then(res=>{
                this.Person=res
             })
         }
      })()      
      
    }
    ,
    methods:{
        
       share(option,index){
           if(index==0){
               Share()
           }
        //    console.log(index)
        //    console.log(option)
       },
        //点击云书馆时触发的事件
        cloudBook(){
            this.$toast("开发小哥哥有点懒,还在开发中")
            return
            // 如果当前用户没有登录就跳转到登录页面
                // 反之是已登录状态就正常跳转
                this.$router.push("/cloudBook")
        },
        //点击我的创作时
        myCreation(){
             this.$toast("开发小哥哥有点懒,还在开发中")
            return
           this.$router.push("/myCreation")
        },
        //点击我的笔记时触发的事件
        myNote(){
              this.$toast("开发小哥哥有点懒,还在开发中")
            return
            this.$router.push("/myNote")
        },
        //点击我的收藏
        myColl(){
              this.$toast("开发小哥哥有点懒,还在开发中")
            return
            this.$router.push("/myColl")
        },
        //点击邀请好友时
        friend(){
             this.showShare=true
        },
        //点击意见反馈
        feedback(){
            this.$router.push("/feedback")
        },
        //点击头像
        update(){
            this.$router.push("/update")
        }
    }
}
</script>>
<style>
    /*设置图片的样式 */
    #Person>.icon{
        /* float:right; */
        display:flex;
        justify-content:flex-end;
        margin-top:15px;
        padding:10px 0;
    }
    #Person>.icon>a{
        font-size:20px;
    }
    #Person .iconshezhi1{
        margin:0 15px;
        color:#743481;
    }
    /* 图标样式结束 */
    /* 头像部分的样式开始 */
    /* 登录前和登录后的公共样式开始 */
    #Person #avator>div{
        display:flex;
        /* align-items:center; */
    }
    #Person #avator h1{
        font-size:24px;
        font-weight:bolder;
        color:#743481;
        margin-bottom:10px;
        letter-spacing:3px;
    }
      #Person #avator h2{
        font-size:14px;
        /* font-weight:bolder; */
        color:#743481;
        letter-spacing:1px;
    }
    #Person #avator>div>div:first-child img{
        width:80px;
        height:80px;
        border-radius:50%;
        margin-left:10px;
    }
       #Person #avator>div>div:nth-child(2){
        margin-top:10px;
        margin-left:20px;
    }
     /* 登录前和登录后的公共样式啊结束 */
     /* 登录之后关注的部分 */
     /* 弹性项目交叉轴末尾对齐 */
     #Person #attention{
         align-self:flex-end;
         font-size:20px;
     }
    /* 菜单1 */
    #Person #menu1{
        border-radius:5px;
        padding-bottom:5px;
        width:95%;
        margin:0 auto;
        margin-top:10px;

    }
    #Person #menu1>a:first-child{
        width:56px;
    }
    #Person #menu1>a{
        float: left;
        margin-left:20px;
        margin-top:20px;
        /* width:70px; */
        text-align:center;
    
    }
    #Person #menu1::after{
        content:"";
        display:block;
        clear:both;
    }
    #Person #menu1 .iconfont{
        font-size:32px;
        color:#743481;
        margin-bottom:4px;
    }
   #Person #menu1 h1{
        color:black;
        font-size:14px;
    }
    /* 分割线 */
    #Person #hr{
        height:10px;
        background-color:#dac7e6;
    }
      /* 我的服务 */
    #Person #myServer{
        border-radius:5px;
        padding-bottom:5px;
        width:95%;
        margin:0 auto;
        margin-top:10px;

    }
    #Person #myServer>h2{
        font-weight:bolder;
        font-size:20px;
        letter-spacing:2px;
    }
    #Person #myServer>a{
        float: left;
        margin-left:20px;
        margin-top:20px;
        /* width:70px; */
        text-align:center;
    
    }
    #Person #myServer::after{
        content:"";
        display:block;
        clear:both;
    }
    #Person #myServer .iconfont{
        font-size:32px;
        color:#743481;
        margin-bottom:4px;
    }
    #Person #myServer h1{
        color:black;
        font-size:14px;
    }
    
</style>
