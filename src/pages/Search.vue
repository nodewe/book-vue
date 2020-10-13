<template>
  <!-- 搜索页面 -->
  <div id="search">
    <div id="header">
      <span @click="back" class="iconfont iconfanhui"></span>
      <input id="input" v-model="value" type="text" placeholder="请输入书名" />
      <h1 @click="search">搜索</h1>
    </div>
    <!-- 内容区域 -->
    <div v-show="searchHis.length>0" class="ct">
      <div class="title">
        <h1>历史记录</h1>
        <div @click="clear" class="iconfont iconshanchu"></div>
      </div>
      <ul class="history">
        <li @click="his(i)" v-for="item,i of searchHis" :key="i">{{item}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: "",
      //存储搜索历史记录的数组
      searchHis: [],
    };
  },
  methods: {
    back() {
      this.$router.go(-1)
      // //获取从哪来的地址栏的参数
      // let url = this.$route.query;
      // if (url.redirect) {
      //   //点击返回在跳回哪里去
      //   this.$router.push(url.redirect);
      // }
    },
    //绑定搜索点击事件
    search() {
        if(!this.value){return;}
      //获取到localStorage中的值
      let his = localStorage.getItem("history");
      //解析
      //当内存中有值时就正常解析 无值是就赋一个数组
      this.searchHis = his ? JSON.parse(his) : [];
      //将本次搜索的值推进数组中
      this.searchHis.push(this.value);
      //避免重复的历史记录
      let storage = [...new Set(this.searchHis)];
      //在将新的数组转成json字符串存入localStroage 不能重复
      localStorage.setItem("history", JSON.stringify(storage));
      this.$router.push(`/searchlist/${this.value}`);
    },
    his(id) {
      //将点击的这个值赋值给value
      this.value = this.searchHis[id];
      //搜索
      this.search();
    },
    //清除历史记录
    clear() {
      localStorage.removeItem("history");
      this.searchHis = [];
    },
  },
  created() {
    //获取到localStorage中的值
    let his = localStorage.getItem("history");
    //解析
    //内存中里面有值时候就解析
    this.searchHis = his ? JSON.parse(his) : [];
  },
};
</script>
<style>
#search #header {
  width: 100%;
  position: fixed;
  top: 0;
  background-color: white;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
#search #header .iconfanhui {
  font-size: 24px;
}
#search #input {
  width: 70%;
  height: 15px;
  padding: 10px 0;
  padding-left: 15px;
  border-radius: 20px;
  border: 1px solid #743481;
}
#search .ct {
  width: 95%;
  margin: 0 auto;
  margin-top: 60px;
}
#search .ct .title {
  display: flex;
  justify-content: space-between;
}
.history {
  margin-top: 10px;
}
.history::after {
  content: "";
  display: block;
  clear: both;
}
.history > li {
  float: left;
  padding: 3px 5px;
  text-align: center;
  height: 20px;
  line-height: 20px;
  margin-left: 5px;
  margin-top: 5px;
  background-color: rgb(206, 206, 206);
}
</style>