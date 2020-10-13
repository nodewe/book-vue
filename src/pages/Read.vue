<template>
   <div id="Read">
     <div id="read">
       <span>书架</span>
       <div>
        <router-link to="/search?redirect=read" class="iconfont iconsousuo"></router-link>
        <h1 @click="change" v-if="select">选择</h1>
        <h1 @click="change" v-else>取消选择</h1>
        <h3 @click="del" v-show="Del">删除</h3>
       </div>
     </div>
     <!-- 内容区域开始 -->
      <van-checkbox-group v-model="result">
    <div id="ct">
          <!-- <p v-for="i of 50">{{i}}</p> -->
          <div :class="{shade}" v-for="item,i of bookdata" :key="i">
            <img @click="toRead(item.bid)" :src="`${url}/coverimage/${item.coverimage}`" alt="">
            <p v-text="item.bookname"></p>
            <div :class="{black}"></div>
                <van-checkbox v-show="checked" :class="{checked}" :name="item.bid"> </van-checkbox>
          </div>
    </div>
       </van-checkbox-group>
    <!-- 内容区域结束 -->
 <!-- tabbar -->
     <my-tabbar></my-tabbar>       
</div> 
</template>
<script>
// 导入请求书架书籍函数   删除指定书籍的函数
import { bookshelf,delShelf } from "../assets/js/apis/user"
import { baseURL } from "../assets/js/apis/url"
import { mapState } from "vuex"
export default {
  computed:{
    ...mapState([
      "uid"
    ])
  },
   data(){
     return{
        bookdata:[],
        url:baseURL,
        result:[],
        //开始 选择是显示
        select:true,
        shade:false,
        black:false,
        checked:false,
        Del:false,
     }
   },
   created(){
     (async ()=>{
       await this.token();
       if(!this.uid){return;}//如果没有登录就不用发送请求
     //组价加载时要发送axios请求
        bookshelf(this.uid).then(res=>{
             this.bookdata=res
        })
     })()
     
   }
   ,
   methods:{
    //点击选择的时候 遮罩的样式开启 取消选择显示
    change(){
      //数组重置
        this.result=[];
        // 改变select的值
        this.select=!this.select;
        // 改变shade的值
        this.shade=!this.shade;
        // 改变删除的样式 
        this.Del=!this.Del;
        // 改变
        this.black=!this.black;
        this.checked=!this.checked;
    },
    //点击删除
    del(){
        if(!this.result.length){
          this.$toast("请选择要删除的书籍")
          return;
        }
        this.$dialog.confirm({
          title: '移除书架',
          message: '确认要移除吗',
        }).then((r) => {
             //收集
                let str = this.result.toString()
                //console.log(str)
                delShelf(this.uid,str).then(res=>{
                  if(res==1){
                    this.$toast("删除成功")
                          bookshelf(this.uid).then(res=>{
                          this.bookdata=res
                          //将选择显示
                          this.select=true;
                           this.Del=false
                      })
                  }
                })
          }).catch((err) => {
            console.info(err)
            // on cancel
          });
          return
       
    },
    //点击看书
    toRead(id){
      this.$router.push("/readPage/"+id)
    }
   }
}
</script>
<style>
   #Read #read{
     width:100%;
     height:60px;
     position:fixed;
     top:0;
     background:white;
    display:flex;
    justify-content:space-between;
    align-items:center;
    border-bottom:1px solid #743481;
   }
   #Read #read>span{
     color:#743481;
     font-size:24px;
     font-family:"宋体";
     font-weight:bold;
     margin-left:10px;
   }
    #Read #read>div{
      display:flex;
      align-items:center;
      margin-right:10px;
    }
    #Read #read>div>h3{
      margin:0 10px;
      color:red;
    }
   #Read .iconsousuo{
     font-size:24px;
     margin-right:10px;
     color:#743481;
   }
   #Read #ct{
     /* background:red; */
     margin-top:60px;
     margin-bottom:70px;
     /* display:flex;
     justify-content:space-around;
     flex-wrap:wrap; */
   }
   #ct>div{
     width:30%;
     margin-left:3%;
     float:left;
   }
   #ct img{
     width:100%;
     height:150px;
   }
   #ct p{
     height:32px;
     margin-top:5px;
     display: -webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient: vertical;
    text-overflow:ellipsis;
    overflow: hidden;
   }
   /* 准备遮罩 */
   #Read .shade{
     position:relative;
   }
   #Read .black{
     position:absolute;
      width:100%;
      height:90%;
      background-color:rgb(180, 180, 180,.6);
      top:0;
   }
   /* 选中的时候改变小圆点的样式 */
   #Read .checked .van-icon{
     position:absolute;
     font-size:20px;
     width:25px;
     height:25px;
     top:40%;
     left:50%;
     z-index:20;
     transform:translate(-50%,-50%);
     background-color:white;
     border-radius:50%;
     overflow:hidden;
   }
   #Read .van-checkbox__icon--checked>.van-icon{
     background-color:#0aa1ed !important;
   }
   /*  */
</style>