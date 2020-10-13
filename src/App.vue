<template>
  <div id="app" v-touch:right="onSwipeRight">
    <transition enter-active-class="animate__animated animate__backInUp" leave-active-class="animate__animated animate__backOutUp">
    <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import animated from"animate.css";
// import {plusReady} from "./assets/js/apis/back"
export default {
  data(){
    return{
        transformName:""
    }
  },
  methods:{
    onSwipeRight(){
      this.$router.back(-1)
    }
  },
  watch:{
    $route(to,from){
       console.log(to)
      if(to.path=="/reg"){//进入注册页面
        this.transformName="myReg"
      };
    }
  }
}
</script>
