<template>
    <div id="mycoll">
        <!-- 导航头 -->
              <div id="header">
                   <i @click="back" class="iconfont iconfanhui"></i>
                   <h1>我的收藏</h1>
              </div>
    </div>
</template>
<script>
import {uploader } from "../assets/js/apis/user"
import { mapState } from "vuex"
export default {
    computed:{
        ...mapState([
            "uid"
        ])
    },
    data(){
        return{
            fileList:[],
            content:""
        }
    },
    methods:{
        // afterRead(index){
        //     console.log(index)
        // }
        toup(){
            let formdata = new FormData()
            //formdata.append("file",this.fileList)
             this.content= this.fileList[0].content
             console.log(this.coontent)
          return
            for(var i of this.fileList){
            formdata.append("file",i.file)
            }
          // console.log(this.fileList)
                uploader(formdata)
        },
        // 点击返回事件
        back(){
            if(this.uid){
                 this.$router.push("/person")
            }else{
                this.$router.go(-1)
            }
           
        }
    },
    watch:{
        fileList(){
            console.log(this.fileList)
        }
    }

}
</script>
<style>
#mycoll #header{
    display:flex;
    position: relative;
    height:60px;
    align-items:center;
    /* background-color:red; */
}
#mycoll #header .iconfanhui{
     font-size:24px;
}
#mycoll #header>h1{
    position:absolute;
    left:50%;
    transform:translate(-50%);
    font-size:24px;
}
</style>