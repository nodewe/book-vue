<template>
  <!-- 书籍的阅读页面 -->
  <div id="readPage">
    <div id="readPage-read">
      <div @click="back" class="iconfont iconfanhui"></div>
      <div v-text="readdata.bookname"></div>
    </div>
    <!-- 阅读的内容 -->
    <div id="readPage-content" v-html="readdata.bookfile"></div>
    <van-loading id="load" v-show="!readdata.bookname" size="60px" vertical>加载中请稍后...</van-loading>
  </div>
</template>
<script>
import { readcontent } from "../assets/js/apis/user";
export default {
  data() {
    return {
      readdata: {},
    };
  },
  methods: {
    back() {
      //点击返回
      history.go(-1);
    },
  },
  created() {
    readcontent(this.$route.params.bid).then((res) => {
      //获取
      //console.log(res)
      this.readdata = res;
      //console.log(res)
    });
  },
};
</script>
<style>
#readPage-read {
  display: flex;
  height: 60px;
  align-items: center;
  background-color: white;
  width: 100%;
  position: fixed;
  top: 0;
}
#readPage-read .iconfanhui {
  font-size: 24px;
  margin-left: 10px;
}
#readPage-read > div:last-child {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
}
/* 阅读的内容 */
#readPage-content {
  margin-top: 60px;
}
#readPage-content img {
  width: 100%;
}
#readPage-content p {
  margin: 10px 0;
  line-height: 28px;
  font-size: 18px;
}
/* 加载中的定位 */
#load {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>