<template>
  <!-- 显示所有评论的页面 -->
  <div id="Allreview">
    <div class="header">
      <!-- 返回的图标 -->
      <div @click="back" class="iconfont iconfanhui"></div>
      <!-- 书籍的名称 -->
      <div class="bookname">全部评论</div>
    </div>
    <!--循环内容  -->

    <div id="allreview">
      <div v-for="item,i of review" :key="i" class="users">
        <div>
          <img :src="`${url}/avatar/${item.avatar}`" alt />
        </div>
        <div class="info">
          <h2 v-text="item.nickname"></h2>
          <p v-text="item.review"></p>
          <i>{{item.date|mydate}}</i>
        </div>
      </div>
    </div>
    <!-- 撰写书评 -->
    <div id="write">
      <button @click="toWrite">撰写书评</button>
    </div>
  </div>
</template>
<script>
import { bookreview } from "../assets/js/apis/book";
import { baseURL } from "../assets/js/apis/url";
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["uid"]),
  },
  data() {
    return {
      review: [],
      val: "",
      url: baseURL,
    };
  },
  methods: {
    back() {
      //点击返回
      history.go(-1);
    },
    toWrite() {
      //撰写书评
      if (!this.uid) {
        //如果没有登录就跳去登录
        this.$router.push("/login");
      }
      //
      this.$router.push(`/write/${this.val}`);
    },
  },
  created() {
    this.token();
    this.val = this.$route.params.bid;
    //发送axios请求拿到书籍的相关评论
    bookreview(this.val).then((res) => {
      this.review = res;
    });
  },
};
</script>
<style>
#Allreview .header {
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  position: fixed;
  top: 0;
  background-color: white;
  border-bottom: 1px solid black;
}
#Allreview .iconfanhui {
  font-size: 24px;
  margin-left: 10px;
  /* width:50%; */
}
#Allreview .bookname {
  /* width:50%; */
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  font-size: 20px;
  letter-spacing: 2px;
  /* text-align:left; */
}
/* 书评 */
/* 书评 */
#allreview {
  width: 95%;
  margin: 0 auto;
  margin-top: 65px;
  margin-bottom: 60px;
}
#allreview > h3 {
  width: 75%;
  margin: 10px auto;
  height: 30px;
  border-radius: 15px;
  text-align: center;
  line-height: 30px;
  color: #743481;
  background: rgb(218, 218, 218);
}

#allreview .users {
  display: flex;
  margin-top: 15px;
}
#allreview .users img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
#allreview .info {
  margin-left: 10px;
  border-bottom: 1px solid gray;
  padding-bottom: 3px;
  width: 80%;
}
#allreview .info > h2 {
  color: #743481;
  font-size: 14px;
}
#allreview .info > h2 {
  margin-top: 5px;
}
#allreview .info > p {
  font-size: 14px;
  line-height: 20px;
  margin-top: 10px;
}
#allreview .info i {
  display: inline-block;
  margin-top: 10px;
  color: gray;
}
#write {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
}
#write button {
  outline: 0;
  border: 0;
  width: 80%;
  height: 50px;
  border-radius: 5px;
  background-color: #743481;
  color: white;
  font-size: 20px;
  letter-spacing: 3px;
}
</style>