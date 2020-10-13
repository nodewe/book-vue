<template>
<!-- 搜索结果页面 -->
    <div id="SearchList">
           <div id="header">
            <span @click="back" class="iconfont iconfanhui"></span>
           <input id="input" v-model="val" type="text" placeholder="请输入书名">
            <h1 @click="search">搜索</h1>
        </div>
        <!-- 搜索结果内容 -->
        <div v-if="data.length>0" id="search">
            <div v-for="item,i of data" :key="i" class="bookList" @click="toDetails(item.bid)">
                <div><img :src="`${url}/coverimage/${item.coverimage}`" alt=""></div>
                <div>
                    <h1 v-text="item.bookname"></h1>
                    <h2 v-text="item.author"></h2>
                    <p v-text="item.intro"></p>
                </div>
            </div>
        </div>
        <!-- 没有就显示图片 -->
        <div v-else id="not">
            <img src="/imgs/notFound.png" alt="">
        </div>
    </div>
</template>
<script>
//导入
import { bookName } from "../assets/js/apis/book";
//导入服务器基础路径
import { baseURL } from "../assets/js/apis/url"
export default {
    data(){
        return {
            val:"",
            data:"",
            url:baseURL
        }
    },
    methods:{
        back(){//点击返回按钮返回到搜索页面
            history.go(-1)
        },
            //绑定搜索点击事件
        search(){
            //点击搜索跳搜索列表查询
            this.$router.push(`/searchlist/${this.val}`)
            //发送axios请求
            bookName(this.val).then(res=>{
                 this.data=res
            })
        },
        //点击书籍跳转到书籍详情页
        toDetails(id){
            this.$router.push(`/bookdetail/${id}`)
        }
    },
    //创建组件后将
    created(){
        this.val = this.$route.params.bookname
          //发送axios请求
            bookName(this.val).then(res=>{
                this.data=res
            })
    },
    //监听地址栏的变化
    watch:{
        $route(){
            this.val = this.$route.params.bookname
        }
    }
}
</script>
<style>
#SearchList #header{
     width:100%;
     position:fixed;
     top:0;
     background-color:white;
     height:60px;
     display:flex;
     justify-content:space-around;
     align-items:center;
 }
 #SearchList #header .iconfanhui{
     font-size:24px;
 }
    #SearchList #input{
        width:70%;
        height:15px;
        padding:10px 0;
        padding-left:15px;
        border-radius:20px;
        border:1px solid #743481;
    }
    /* 搜索结果 */
    #SearchList #search{
        margin-top:60px;
    }
    #SearchList #search .bookList{
        display:flex;
        width:95%;
        margin:0 auto;
        background:rgb(223, 220, 220);
        border-radius:5px;
        align-items:center;
         padding:10px 0;
         margin-bottom:10px;
    }
    #SearchList #search .bookList img{
        width:60px;
        margin-left:10px;
    }
     #SearchList #search .bookList>div:nth-child(2){
         margin-top:5px;
          margin-left:10px;
     }
     #SearchList #search .bookList h1{
        color: #743481;
     }
     #SearchList #search .bookList h2{
         margin-top:10px;
         font-size:12px;
     }
    #SearchList #search .bookList p{
        margin-top:10px;
        font-size:12px;
        line-height:14px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-overflow:ellipsis;
        overflow: hidden;
    }
    /* 没有找到时的图片 */
    #not>img{
        width:100%;
    }
</style>