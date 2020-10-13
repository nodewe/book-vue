<template>
    <div id="FeedBack">
        <!-- 意见反馈 -->
        <div id="Feedback">
            <div @click="back" class="iconfont iconfanhui"></div>
            <div>意见反馈</div>
            <div  @click="Feedback">提交</div>
        </div>
        <!-- 分割线 -->
        <p class="hr"></p>
        <!-- 反馈的内容 -->
        <textarea v-myfocus v-model="val" id="question" placeholder="请尽可能详细的描述问题"></textarea>
    </div>
</template>
<script>
//导出
import { Feedback } from "../assets/js/apis/user"
import { mapState } from "vuex"
// import { token } from "../assets/js/apis/token"
export default {
    computed:{
        ...mapState([
            "uid"
        ])
    },
    data(){
        return{
            val:""
        }
    },
    methods:{
        Feedback(){
            //如果为空提示不能为空
            if(!this.val.trim()){
                this.$toast("反馈信息不能为空")
            }
            //消息提交
            FeedBack(this.uid,this.val).then(res=>{
                console.log(res)
            })
        },
        //点击返回
        back(){
            this.$router.push("/person")
            // history.go(-1)
        }
    }
}
</script>
<style>
    #Feedback{
        display:flex;
        width:100%;
        height:60px;
        justify-content:space-around;
        align-items:center;
        background-color:white;
    }
    #Feedback>div:nth-child(2){
        font-size:20px;
    }
    #Feedback .iconfanhui{
        font-size:24px;
        transform:translate(-100%);
    }
     #FeedBack .hr{
        height:10px;
        background-color:rgb(223, 219, 219);
    }
    #question{
        width:100%;
        min-height:200px;
        max-height:200px;
        border:0;
        margin-top:10px;
        background-color:rgb(204, 202, 202);
        padding:5px 0;
    }

</style>