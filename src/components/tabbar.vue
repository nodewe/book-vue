<template>
    <div>
      <van-tabbar route>
        <van-tabbar-item replace to="/" class="iconfont iconzhuye">
            首页
        </van-tabbar-item>
        <van-tabbar-item replace to="/discover" class="iconfont iconfaxian">
            发现
        </van-tabbar-item>
         <van-tabbar-item @click="Show" class="iconfont iconwuuiconxiangjifangda">
          
        </van-tabbar-item>
         <van-tabbar-item replace to="/read" class="iconfont iconshu1">
            读书
        </van-tabbar-item>
         <van-tabbar-item replace to="/person" class="iconfont iconwode">
            我的
        </van-tabbar-item>
        </van-tabbar>
        <van-overlay :show="show">
               <div id="list">
                   <div @click="viewpoint">
                       <p><img :src="`${url}/guandian.png`"></p>
                       <h2>观点</h2>
                   </div>
                   <div>
                       <p><img :src="`${url}/book_zhai.png`"></p>
                       <h2>书摘</h2>
                   </div>
                     <div>
                       <p><img :src="`${url}/book_dan.png`"></p>
                       <h2>书单</h2>
                   </div>
                    <div>
                       <p><img :src="`${url}/note.png`"></p>
                       <h2>笔记</h2>
                   </div>
               </div>
               <div @click="close" class="iconfont iconchacha"></div>
        </van-overlay>
    </div>

</template>
<script>
import { mapState } from "vuex"
import { token } from "../assets/js/apis/token"
import { baseURL } from "../assets/js/apis/url"
export default {
    computed:{
        // 引入转态
        ...mapState([
            "uid"
        ])
    },
    data(){
        return{
          show:false,
          url:baseURL
        }
    },
    created(){
        //创建组件时就发送
        token()
    } ,
    methods:{
        // 点击加号的实收将遮罩开启
        Show(){
            this.show=true
        },
        // 点击叉号的时候将遮罩关闭
        close(){
            this.show=false
        },
        //观点详情页
        viewpoint(){
            if(!this.uid){
                this.$router.push("/login")
                return;
            }
            this.$router.push("/viewpoint")
        }
    }
}
</script>
<style>
/* 设置每一个item的高度 */
  .van-tabbar{
      height:70px;
  }
/* 图标 */
  .van-tabbar-item{
     font-size:26px;
  }
  /* 图标的文本 */
    .van-tabbar-item__text{
        font-size:12px;
    }
    /* 选中的样式 */
    .van-tabbar-item--active{
        color:#743481;
    }
    /* 中间一个加号的样式 */
    .iconwuuiconxiangjifangda{
        font-size:44px;
        color: #743481;
        text-shadow:0 3px 8px #743481;
    }
    .van-overlay{
        background-color:rgba(255,255,255,.7);
    }
    #list{
        width:95%;
        margin:0 auto;
        display:flex;
        justify-content:space-around;
        margin-top:120%;
        margin-bottom:40px;
    }
    /* 点击关闭按钮 */
    .iconchacha{
        text-align:center;
        margin-top:20px;
        color:#743481;
        font-size:24px;
    }
</style>

