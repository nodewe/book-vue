<template>
   <div>
     <div id="navbar">
       <span>发现</span>
       <input @click="toSearch" type="text" placeholder="请输入书名">
       <h1 class="iconfont iconsousuo"></h1>
     </div>
     <!-- 内容区域-->
         <van-pull-refresh
                v-model="isLoading"
                success-text="刷新成功"
                @refresh="onRefresh"
              >
            <div id="contentArea">
                    <!-- 随便看看 -->
                    <div id="see">
                        <h1>随便看看</h1>
                        <h3 @click="transform">换一换</h3>
                    </div>
                    <!-- 换一换的内容 -->
                    <div id="seeTrade">
                      <div @click="toDetails(item.bid)" v-for="item,i of casual">
                          <img :src="`${url}/coverimage/${item.coverimage}`">
                          <p v-text="item.bookname"></p>
                      </div>
                    </div>

                    <!-- 书友推荐 -->
                  <div id="friend">
                      <h1>书友推荐</h1>
                      <h3 @click="more">更多</h3>
                  </div>
                  <!-- 书友推荐内容 -->
                    <div  v-for="item,i of tuijian" class="rmd">
                        <div @click="toView(item.vid)" class="rmd-left">
                            <p v-text="item.viewcontent"></p>
                            <div>
                              <div><img :src="`${url}/avatar/${item.avatar}`" alt=""></div>
                              <div class="personinfo">
                                    <h1 v-text="item.nickname">昵称</h1>
                                    <h2>推荐《{{item.bookname}}》</h2>
                              </div>
                            </div>
                        </div>          
                        <div @click="toDetails(item.bid)" class="bookimg"><img :src="`${url}/coverimage/${item.coverimage}`" alt=""></div>
                    </div>
            </div>
     </van-pull-refresh>
 <!-- tabbar -->
     <my-tabbar></my-tabbar>       
</div> 
</template>
<script>
import {see,viewPoint} from "../assets/js/apis/book" 
import {baseURL} from "../assets/js/apis/url"
export default {
   data(){
     return{
       //s随便看看数据
       casual:[],
       url:baseURL,
       tuijian:[],
       //刷新的状态
       isLoading:true
     }
   },
   methods:{
     //刷新的回调函数
     onRefresh(){
       //刷新时发送异步请求
          viewPoint().then(res=>{
            this.tuijian=res
            //数据返回之后 改变加载状态
            this.isLoading=false
          })
     },
     //点击输入框进入搜索页面
     toSearch(){
       this.$router.push("/search?redirect=discover")
     },
     //点击换一换
     transform(){
         //点击换一换发送axios请求
          see().then(res=>{
            this.casual=[];
            let random = parseInt(Math.random()*45)
            for(var i=random;i<random+6;i++){
                this.casual.push(res[i])
            }
          })
     },
     //点击书籍跳转到详情页
     toDetails(id){
       this.$router.push("/bookdetail/"+id)
     },
     //点击更多
     more(){
       this.$router.push("/")
     },
     //点击每一项跳到详情页
     toView(id){
       this.$router.push("/excerpt/"+id)
     },
     //点击书跳到书籍详情页
     toDetails(id){
       this.$router.push("/bookdetail/"+id)
     }
   },
   created(){
    //组件加载时发送axios请求
      see().then(res=>{
        let random = parseInt(Math.random()*45)
        for(var i=random;i<random+6;i++){
             this.casual.push(res[i])
        }
      })
      //组件加载时查询
      viewPoint().then(res=>{
         this.tuijian=res
      })
    }
}
</script>
<style>
  #navbar{
  position:fixed;
  top:0;
  height:60px;
  width:100%;
  background-color:white;
  display:flex;
  align-items:center;
  justify-content:space-around;
  z-index:100;
  }
 #navbar input{
   width:55%;
    border-bottom:0;
    padding:6px 0;
    border-radius:20px;
    padding-left:30px;
    border:1px solid #743481;
  }
  #navbar input::placeholder{
    color:#743481;
  }
  #navbar>span{
    font-size:24px;
    font-family:"宋体";
    font-weight:bold;
    color:#743481;
  }
  #navbar>h1{
    position:absolute;
    top:20px;
    left:33%;
  }
  #contentArea{
    margin-top:61px;
    margin-bottom:70px;
  }
  /* 随便看看 */
  #see{
    display:flex;
    height:50px;
    background-color:white;
    justify-content:space-between;
    align-items:center;
  }
  #see>h1{
    font-size:24px;
    font-family:"仿宋";
    margin-left:10px;
    font-weight:bold;
  }
  #see>h3{
    margin-right:10px;
    color:#743481;
  }
  /* 随便看看的内容 */
  #seeTrade{
    display:flex;
    justify-content:space-around;
    flex-wrap:wrap;
  }
  #seeTrade>div{
    width:30%;
  }
  #seeTrade>div:first-child{
    margin-bottom:5px;
  }
  #seeTrade img{
    width:100%;
    height:150px;
  }
  #seeTrade p{
    display: -webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient: vertical;
    text-overflow:ellipsis;
    overflow: hidden;
  }
  /* 书友推荐 */
  #friend{
    display:flex;
    height:50px;
    background:white;
    justify-content:space-between;
    align-items:center;
    margin-top:20px;
  }
    #friend>h1{
    font-size:24px;
    font-family:"仿宋";
    margin-left:10px;
    font-weight:bold;
  }
  #friend>h3{
    margin-right:10px;
    color:#743481;
  }
  /* 书友推荐内容 */
  #contentArea .rmd{
    display:flex;
    width:95%;
    margin:0 auto;
    border-bottom:1px solid black;
    padding-bottom:2px;
    margin-top:10px;
    justify-content:space-between;
  }
   #contentArea .rmd-left>p{
      min-height:60px;
      width:100%;
      display: -webkit-box;
      -webkit-line-clamp:2;
      -webkit-box-orient: vertical;
      text-overflow:ellipsis;
      overflow: hidden;
   }
   #contentArea .rmd-left>div{
     display:flex;
      align-items:center;
   }
   #contentArea .rmd-left img{
     width:40px;
     height:40px;
     border-radius:50%;
     margin-right:5px;
   }
   .personinfo>h2{
     margin-top:10px;
   }
   .bookimg>img{
     width:80px;
   }
</style>