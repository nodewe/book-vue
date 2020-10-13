<template>
  <!-- 账户信息 -->
  <div id="accountInfo">
    <!--头部提示  -->
    <div id="info-header">
      <!-- 左边返回的箭头 -->
      <div @click="back" class="iconfont iconfanhui"></div>
      <!-- 中间的文字 -->
      <div>账户信息</div>
    </div>
    <!-- 详情 -->
    <van-cell @click="toSetUpwd" title="设置密码" is-link />
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    //点击返回
    back() {
      this.$router.go(-1);
    },
    toSetUpwd() {
      this.$router.push("/setupwd");
    },
  },
};
</script>
<style>
/* 头部信息的导航栏 */
#info-header {
  display: flex;
  align-items: center;
  position: relative;
  background-color: white;
  height: 60px;
}
/* 设置返回图标的样式 */
#info-header .iconfanhui {
  /* color:white; */
  font-size: 24px;
  margin-left: 10px;
}
/* 设置导航中间的文字 */
#info-header > div:nth-child(2) {
  font-size: 24px;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
}
/* cell的样式 */
#accountInfo .van-cell__title {
  font-size: 18px;
}
#accountInfo .van-icon-arrow {
  font-size: 18px;
}
#accountInfo .van-cell {
  padding-bottom: 15px;
  padding-top: 15px;
}
</style>