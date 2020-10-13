<template>
    <div id="Update">
        <!-- 头部的状态 -->
        <div id="header">
            <router-link to="/person" class="iconfont iconfanhui"></router-link>
            <div>修改头像</div>
        </div>
                <van-uploader id="upload" v-model="fileList" multiple max-count="1" />
                <table></table>
                <!-- <van-uploader id="upload" image-fit="Image" :max-count="1" :data={uid:uid} :after-read="afterRead" /> -->
                <div id="center">
                  <button id="up" @click="upload">确定上传</button>
                </div>
    </div>
</template>
<script>
import { upload } from "../assets/js/apis/user"
import { mapState } from "vuex"
export default {
    computed:{
        ...mapState([
            "uid"
        ])
    },
    data(){
        return {
          fileList:[]
        }
    },
    methods:{
        upload(){
          let data = new FormData()
        
          data.append("file",this.fileList[0].file)
           data.append("uid",this.uid)
               upload(data).then(res=>{
                if(res==1){
                    this.$toast("上传成功")
                    //localStorage.setItem("avatar",)
                    this.$router.push("/person")
                }
            })
        },
       created(){
           this.token()
       },
    }
}
</script>
<style>
   #Update #header{
       position: relative;;
       width:100%;
       height:60px;
       background-color:white;
       display:flex;
       align-items:center;
   }
   #header .iconfanhui{
       font-size:32px;
        align-self:center;
   }
   #Update #header>div{
       position:absolute;
       left:50%;
       transform:translate(-50%);
       font-size:20px;
   }
   /* 上传 */
#Update .van-uploader__upload{
       width:150px !important;
       height:150px !important;
       /* left:70% !important; */
       background-color:#743481 !important;
       /* transform:translateX(50%); */
}
#Update .van-uploader{
    display:block !important;
}
 #Update .van-uploader__wrapper{
     position: absolute;
     left:50%;
     transform:translateX(-50%);
 }

  #Update .van-uploader__wrapper,#Update .van-uploader__preview,#Update .van-image{
     height:150px !important;
    width:150px !important;
     
}
#Update #center{
    width:100%;
    margin-top:170px;
   position: relative;
    display:flex;
    justify-content:center;
    align-items:center;
}
/* 点击上传的按钮 */
        #up{
            width:150px;
            height:40px;
            outline:0;
            border:0;
            background-color:#743481;
            color:white;

        }
</style>