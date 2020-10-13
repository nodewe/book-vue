<template>
    <div id="Write">
          <div class="header">
              <!-- 返回的图标 -->
              <div @click="back" class="iconfont iconfanhui"></div>
          </div>
          <!-- 书籍 -->
          <div id="WriteBg">
            <div id="details">
                    <img :src="`${url}/coverimage/${bookdata.coverimage}`" alt="">
                    <div>
                        <p v-text="bookdata.bookname"></p>
                        <h1 v-text="bookdata.author"></h1>
                    </div>
            </div>
          </div>
             <!-- 分割线 -->
         <p class="hr"></p>
         
         <textarea v-myfocus id="Write-Ct" v-model="val" maxlength="500" placeholder="说点什么吧..."></textarea>
         <h1>{{num}}/500</h1>
         <!-- 底部发送 -->
         <div id="footer">
             <div @click="send" class="iconfont iconfasong"></div>
         </div>
    </div>
</template>
<script>
import { bookDetails,Send} from '../assets/js/apis/book'
import { baseURL } from '../assets/js/apis/url'
import Vue from "vue"
//自定义指令
Vue.directive("myfocus",{
    inserted(elem){
        elem.focus()
    }
})
import { mapState } from "vuex"
export default {
    computed:{
        ...mapState([
            "uid"
        ])
    },
    data(){
        return{
            //保存服务器基础路径
            url:baseURL,
            bookdata:{coverimage:"bainiangudu.jpg"},
            //内容的长度
            num:0,
            // 内容
            val:""
        }
    },
    methods:{
        back(){
            history.go(-1)
        },
        //点击发送时
        send(){
            let bid=this.$route.params.bid
            Send(bid,this.uid,this.val).then(res=>{
                //console.log(res)
                if(res==1){
                    this.$toast("发布成功")
                    history.go(-1)
                      bookDetails(this.$route.params.bid).then(res=>{
                            this.bookdata=res
                        })
                }
            })
        }
    },
    watch:{
        //当val的值发生改变时
        val(){
            this.num=this.val.length
        }
    },
    created(){
        this.token()
        //发送axios请求拿到书籍的详细信息
        bookDetails(this.$route.params.bid).then(res=>{
            this.bookdata=res
        })
    }
}
</script>
<style>
   #Write .header{
       display:flex;
       align-items:center;
       width:100%;
       height:60px;
       position:fixed;
       top:0;
       background-color:white;
       border-bottom:1px solid black;
   }
   #Write .iconfanhui{
       font-size:24px;
       margin-left:10px;
       /* width:50%; */
   }

   /* 书籍详情 */
    /* 详情  书的封面和书名及作者*/
 #WriteBg{
     background-color:#743481;
     margin-top:60px;
 }
 #WriteBg #details{
     display:flex;
     width:90%;
     margin:0 auto;
     padding:10px 0;
     color:white;
 }
  #WriteBg #details img{
     width:25%;
 }
 #WriteBg #details>div:nth-child(2){
     margin-left:20px;
 }
 #WriteBg #details p{
     font-size:20px;
     margin-top:10px;
 }
 #WriteBg #details h1{
     margin-top:20px;
 }
  /* 分割线 */
  #Write .hr{
     height:20px;
     background-color:rgb(189, 185, 185);
 }
 /* 内容 */
 #Write #Write-Ct{
     width:100%;
     min-height:200px;
     max-height:200px;
     margin-top:5px;
     border:0;
     background-color:rgb(210, 211, 210);
    
 }
 #Write>h1{
     text-align:right;
     color:gray;
 }
 #footer{
     position:fixed;
     bottom:0;
     display:flex;
     justify-content:flex-end;
     align-items:center;
     width:100%;
     height:60px;
     background-color:white;
 }
 #footer>div{
     font-size:28px;
     margin-right:20px;
 }
</style>