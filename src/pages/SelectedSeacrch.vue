<template>
    <div id="Selected">
        <div id="header">
            <div @click="back" class="iconfont iconfanhui"></div>
            <div>选择图书</div>
            <div @click="confirm">确定</div>
        </div>
        <!--搜索框 -->
        <div class="search">
            <input v-myfocus type="text" id="select" v-model="val" placeholder="搜索书籍">
        </div>
        <!-- 数据 -->
        <div id="search">
        <van-radio-group v-model="radio">
             <div v-for="item,i of data" :key="i" class="bookList">
                <div><img :src="`${url}/coverimage/${item.coverimage}`" alt=""></div>
                <div>
                    <h1 v-text="item.bookname"></h1>
                    <h2 v-text="item.author"></h2>
                    <p v-text="item.intro"></p>
                </div>
                <van-radio class="radio" :name="item.bid"></van-radio>
            </div>
        </van-radio-group>
        </div>
    </div>
</template>
<script>
import {bookName} from "../assets/js/apis/book"
import { baseURL } from '../assets/js/apis/url'
export default {
    data(){
        return{
            //输入的的书籍
            val:"",
            //返回数据
            data:"",
            radio:0,
            url:baseURL
        }
    },
    methods:{
        //点击返回
        back(){
            this.$router.go(-1)
           // history.go(-1)
        },
        //点击确定返回数据
        confirm(){
            if(!this.radio){
                this.$toast("至少选择一本书")
                return
            }
            this.$router.push(`/viewpoint?${this.radio}`)
        }
    },
    watch:{
        val(){
            if(this.val){
                bookName(this.val).then(res=>{
                    //console.log(res)
                    this.data=res
                })
            }
        }
    }
}
</script>
<style>
    #Selected>#header{
        display:flex;
        justify-content:space-between;
        align-items:center;
        width:100%;
        height:60px;
        background-color:white;
    }
    #Selected>#header .iconfanhui{
        font-size:24px;
        margin-left:10px;
    }
    #Selected>#header>div:last-child{
        margin-right:10px;
    }

    #Selected>.search{
        width:100%;
        background-color:white;
        position: relative;
    }
    #select{
        display:block;
        width:80%;
        margin:0 auto;
        height:15px;
        padding:10px 0;
        padding-left:15px;
        border-radius:20px;
        background-color:rgb(207, 206, 206);
    }

     #Selected #search{
        margin-top:20px;
    }
    #Selected #search .bookList{
        display:flex;
        width:95%;
        margin:0 auto;
        background:rgb(223, 220, 220);
        border-radius:5px;
        align-items:center;
         padding:10px 0;
         margin-bottom:10px;
    }
    #Selected #search .bookList img{
        width:60px;
        margin-left:10px;
    }
     #Selected #search .bookList>div:nth-child(2){
         margin-top:5px;
          margin-left:10px;
     }
     #Selected #search .bookList h1{
        color: #743481;
     }
     #Selected #search .bookList h2{
         margin-top:10px;
         font-size:12px;
     }
    #Selected #search .bookList p{
        margin-top:10px;
        font-size:12px;
        line-height:14px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-overflow:ellipsis;
        overflow: hidden;
    }
    #Selected #search .radio{
        position:absolute;
        right:15px;
        z-index:100;
        background-color:white;
        border-radius:50%;
    }
</style>