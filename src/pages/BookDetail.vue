<template>
  <!-- 书籍的详情页 -->
  <div id="BookDetail">
    <!-- 顶部的导航 -->
    <div class="header">
      <!-- 返回的图标 -->
      <div @click="toredirect" class="iconfont iconfanhui"></div>
      <!-- 书籍的名称 -->
      <div class="bookname" v-text="bookdata.bookname"></div>
    </div>
    <div id="Content">
      <!-- 头部书籍详情 -->
      <div id="Bg">
        <div id="details">
          <img :src="`${url}/coverimage/${bookdata.coverimage}`" alt />
          <div>
            <p v-text="bookdata.bookname"></p>
            <h1 v-text="bookdata.author"></h1>
          </div>
        </div>
      </div>
      <!-- 书的简介 -->
      <div id="description">
        <h2>简介</h2>
        <p v-text="bookdata.intro"></p>
      </div>
      <!-- 分割线 -->
      <p id="hr"></p>
      <!-- 书评 -->
      <div id="review">
        <div id="book">
          <h2>书评</h2>
          <h5 v-show="reviewLength>0">{{reviewLength}}条评论</h5>
        </div>
        <h3 @click="toWrite">雅俗共赏,发表你的读书感想...</h3>
        <!-- 如果评论区有数据就走循环 -->
        <div v-if="reviewLength">
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
        <!-- 反之没有数据走这个 评论区贫瘠 -->
        <div id="err" v-else>
          <img :src="`${url}/err.jpg`" alt />
        </div>
      </div>

      <!-- 更多评论 -->
      <div v-show="review.length==3" id="more">
        <router-link :to="`/allreview/${val}`">查看更多评论>></router-link>
      </div>
    </div>

    <!-- 固定定位的加入书架的按钮 -->
    <div id="addBookself">
      <button @click="join">加入书架</button>
    </div>
  </div>
</template>
<script>
import { bookDetails, bookreview } from "../assets/js/apis/book";
import { joinShelf } from "../assets/js/apis/user";
import { baseURL } from "../assets/js/apis/url";
import Vue from "vue";
import { mapState } from "vuex";
//引入颜色
import color from "rgbaster";
import { relativeTimeThreshold } from "moment";
//过滤器
Vue.filter("mydate", (oldVal) => {
  let date = new Date(oldVal).toLocaleDateString();
  let huors = new Date(oldVal).getHours();
  huors = huors < 10 ? "0" + huors : huors;
  let mins = new Date(oldVal).getMinutes();
  mins = mins < 10 ? "0" + mins : mins;
  let time = huors + ":" + mins;
  return date + " " + time;
});
export default {
  computed: {
    ...mapState(["uid"]),
  },
  data() {
    return {
      //书籍id参数
      val: "",
      // 返回书籍的信息
      bookdata: { coverimage: "guaidanxingweixue.jpg" },
      //url基础路径
      url: baseURL,
      //书籍相关评论的数据
      review: [],
      //拿到评论的长度
      reviewLength: "",
      //存储图片的颜色
      bg: "",
    };
  },
  methods: {
    toredirect() {
      //点击返回
      history.go(-1);
    },
    //点击跳转到撰写书评页面
    toWrite() {
      if (!this.uid) {
        //如果没有登录,就跳去登录
        this.$router.push("/login");
        return;
      }
      this.$router.push(`/write/${this.val}`);
    },
    //点击加入书架
    join() {
      if (!this.uid) {
        //如果没有登录,就跳去登录
        this.$router.push("/login");
        return;
      }
      joinShelf(this.uid, this.val).then((res) => {
        //返回0证明已存在
        if (res == 1) {
          this.$toast("成功添加");
        } else {
          this.$toast("已添加,请去书架查看");
        }
        //返回1证明添加书架成功
      });
    },
  },
  created() {
    this.token();
    this.val = this.$route.params.bid;
    //发送axios请求拿到书籍的详细信息

    //console.log(this.bg)

    //发送axios请求拿到书籍的相关评论
    bookreview(this.val).then((res) => {
      this.reviewLength = res.length;
      if (res.length > 3) {
        //如果返回的数据大于3条
        let data = [];
        for (var i = 0; i < 3; i++) {
          data.push(res[i]);
        }
        this.review = data;
      } else {
        this.review = res;
      }
    });
  },
  async mounted() {
      this.bookdata = await bookDetails(this.val);
      let res = await color(
        `${baseURL}/coverimage/${this.bookdata.coverimage}`,
        {
          scale: 0.5,
          ignore: ["rgb(255,255,255)", "rgb(0,0,0)", "rgb(247,247,247)"],
        }
      );
      this.bg = res[0].color;
      //console.log(this.bg)

      // console.log(this.bg)
      // return
      let index = this.bg.lastIndexOf(",");
      let str = this.bg.slice(index + 1, -1);
      //str的值大于200就赋值为200 否则就等于自己
      str = str > 200 ? "50" : str;
      this.bg = this.bg.slice(0, index) + "," + str + ")";
      let bg = document.getElementById("Bg");
      bg.style.backgroundColor = this.bg;
      //  console.log(this.bg[0].color)

    // console.log(this.bg)
  },
};
</script>
<style>
#BookDetail .header {
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  position: fixed;
  top: 0;
  background-color: white;
}
#BookDetail .iconfanhui {
  font-size: 24px;
  margin-left: 10px;
  /* width:50%; */
}
#BookDetail .bookname {
  /* width:50%; */
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  font-size: 20px;
  letter-spacing: 2px;
  /* text-align:left; */
}

/* 详情  书的封面和书名及作者*/
/* #Bg{
     background-color:#743481;
 } */
#details {
  display: flex;
  width: 90%;
  margin: 0 auto;
  padding: 10px 0;
  color: white;
}
#details img {
  width: 25%;
  height: 112px;
}
#details > div:nth-child(2) {
  margin-left: 20px;
}
#details p {
  font-size: 20px;
  margin-top: 10px;
}
#details h1 {
  margin-top: 20px;
}
/* 书的简介 */
#description {
  width: 95%;
  margin: 0 auto;
  margin-top: 20px;
}
#description > h2 {
  font: 24px "宋体";
  font-weight: bold;
}
#description > p {
  font: 12px "黑体";
  margin-top: 10px;
  color: gray;
}
/* 分割线 */
#hr {
  height: 10px;
  background-color: #743481;
  margin-top: 5px;
}
/* 书评 */
#review {
  width: 95%;
  margin: 0 auto;
  margin-top: 20px;
}
#review > h3 {
  width: 75%;
  margin: 10px auto;
  height: 30px;
  border-radius: 15px;
  text-align: center;
  line-height: 30px;
  color: #743481;
  background: rgb(218, 218, 218);
}
#review #book > h2 {
  font: 24px "宋体";
  font-weight: bold;
}
#book {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#err > img {
  width: 100%;
}
.users {
  display: flex;
  margin-top: 15px;
}
.users img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.info {
  margin-left: 10px;
  border-bottom: 1px solid gray;
  padding-bottom: 3px;
  width: 80%;
}
.info > h2 {
  color: #743481;
  font-size: 14px;
}
.info > h2 {
  margin-top: 5px;
}
.info > p {
  font-size: 14px;
  line-height: 20px;
  margin-top: 10px;
}
.info i {
  display: inline-block;
  margin-top: 10px;
  color: gray;
}
/* 加入书架按钮的样式 */
#addBookself {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 0.5px solid black;
}
#addBookself button {
  outline: 0;
  border: 0;
  width: 80%;
  height: 50px;
  background-color: #743481;
  color: white;
  border-radius: 5px;
  letter-spacing: 2px;
}
/* 内容区域 */
#Content {
  margin: 60px 0;
  min-height: 600px;
}
/* 更多 */
#more {
  text-align: center;
  padding: 20px 0;
}
#more > a {
  color: #743481;
}
</style>