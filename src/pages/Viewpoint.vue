<template>
    <div id="Viewpoint">
        <!-- 头部 -->
        <div class="header">
            <div @click="close" class="iconfont iconcross"></div>
            <div @click="issue">发布</div>
        </div>
        <!-- 内容话题 -->
        <textarea v-myfocus maxlength="500" v-model="view" id="viewpointcontent" placeholder="我的观点..."></textarea>
        <h1>{{num}}/500</h1>
        <!-- 上传传图片 -->
        <div id="imgs">
             <van-uploader v-model="fileList" multiple max-count="9"/>
        </div>
        <!-- 选择书籍名名称 -->
        <h3 v-show="bookname">已选择--{{bookname}}</h3>
        <!-- 底部的选择书籍 -->
        <div class="footer">
            <div @click="toSelected" class="iconfont iconshu4"></div>
        </div>
    </div>
</template>
<script>
//导入封装好的函数
import { bookDetails,Issue } from "../assets/js/apis/book";
import { mapState } from "vuex";
export default {
    computed:{
        ...mapState([
            "uid"
        ])
    },
    data(){
        return{
            //内容
            view:"",
            //字符录入数
            num:0,
            //当前书籍的id
            bid:"",
            bookname:"",
            //上传的文件
            fileList:[]

        }
    },
    created(){
        this.token()
        let val= Object.keys(this.$route.query)
        if(val.length){
            //先将这个变量值保存
            this.bid=val[0];
            //发送请求
            bookDetails(this.bid).then(res=>{
                this.bookname=res.bookname
                //console.log(res)
            })
        }
    },
    methods:{
        close(){
            this.$router.go(-1)
           // history.go(-1)
        },
        toSelected(){
            this.$router.push("/selectedseacrch")
        },
        //点击发布
        issue(){
            let data = new FormData()
            for(var item of this.fileList){
                    data.append("file",item.file)
            }
            data.append("bid",this.bid)
            data.append("uid",this.uid)
            data.append("viewcontent",this.view)
            data.append("date",+new Date())
            Issue(data).then(res=>{
                if(res==1){
                    this.$toast("发布成功")
                    this.$router.push("/")
                }
            })
        }
    },
    watch:{
        view(){
            this.num=this.view.length
        }
    }
}
</script>
<style>
    #Viewpoint .header{
        display:flex;
        height:60px;
        width:100%;
        justify-content:space-between;
        align-items:center;
        background:white;
    }
    #Viewpoint .header .iconcross{
        font-size:24px;
        margin-left:10px;
    }
    #Viewpoint .header>div:nth-child(2){
        margin-right:10px;
    }
    #viewpointcontent::placeholder{
        
        text-indent:32px;
    }
    #viewpointcontent{
        border:0;
        border-radius:5px;
        display:block;
        width:90%;
        margin:0 auto;
        padding-top:5px;
        min-height:100px;
        max-height:100px;
        background-color:rgb(204, 202, 202);
    }
    #Viewpoint>h1{
        width:90%;
        margin:0 auto;
        text-align:right;
        color:gray;
    }
    /* 底部 */
     #Viewpoint .footer{
         position:fixed;
         bottom:0;
         width:100%;
         height:60px;
         display:flex;
         align-items:center;
         background-color:white;
         border-top:1px solid black;
     }
     #Viewpoint .footer>div{
         font-size:40px;
         margin-left:10px;
     }
     #Viewpoint>h3{
         width:90%;
         margin:0 auto;
         color:#743481;
     }
     /* 上传的图片样式 */
     #imgs{
         width:90%;
         margin:10px auto;
         /* margin-top:10px; */

     }
     
</style>