<template>
  <!-- 头部 -->
  <div id="excerpt">
    <div id="excerpt-head">
      <div @click="back" class="iconfont iconfanhui"></div>
      <div>观点详情页</div>
    </div>
    <!-- 内容区域 -->
    <div id="Details">
      <!-- 头部 -->
      <div id="excerpt-header">
        <div>
          <div>
            <img :src="`${url}/avatar${bookdata.avatar}`" alt />
          </div>
          <div id="nickname" v-text="bookdata.nickname"></div>
        </div>
        <div v-text="attentionmsg" v-show="uid!=bookdata.uid" @click="attention(bookdata.uid)">关注</div>
      </div>
      <!-- 内容 -->
      <div v-text="bookdata.viewcontent" id="excerpt-padding"></div>
      <!-- 内容框的结束 -->
      <!--详情页里的图片开始-->
      <p v-show="bookdata.imgs" id="images">
        <img v-for="itemImage,i of bookdata.imgs" :src="`${url}/usersimage/${itemImage}`" />
      </p>
      <!-- 详情页里的图片结束 -->
      <!-- 书籍 -->
      <div @click="toDetails(bookdata.bid)" id="excerpt-book">
        <img :src="`${url}/coverimage/${bookdata.coverimage}`" title="封面" alt="封面" />
        <div>
          <h1 v-text="bookdata.bookname"></h1>
          <h2 v-text="bookdata.author"></h2>
        </div>
      </div>
      <!-- 时间 -->
      <h6></h6>
      <!-- 评论 -->
      <div id="excerpt-title">
        <div>全部评论</div>
        <div>共{{num}}条</div>
      </div>
      <div v-if="num">
        <div v-for="item,i of info" :key="i" class="excerpt-users">
          <div>
            <img :src="`${url}/avatar/${item.avatar}`" />
          </div>
          <div class="excerpt-info">
            <h2 v-text="item.nickname"></h2>
            <p v-text="item.details"></p>
            <i>{{item.date|mydate}}</i>
          </div>
        </div>
      </div>
      <div v-else id="excerpt-err">
        <img :src="`${url}/err.jpg`" alt />
      </div>
    </div>
    <!-- 页脚评论 -->
    <div id="footerView">
      <input v-model="val" type="text" placeholder="不愧是你,提笔就是一条评论" />
      <div @click="send" class="iconfont iconfasong"></div>
    </div>
  </div>
</template>
<script>
//导入发送请求的函数
import { BookView, bookviewdetails } from "../assets/js/apis/book";
import { Attention, isAttention, Send } from "../assets/js/apis/user";
import { baseURL } from "../assets/js/apis/url";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["uid"]),
  },
  data() {
    return {
      //服务器端基础路径
      url: baseURL,
      bookdata: { avatar: "/default.png", coverimage: "bainiangudu.jpg" },
      //评论的条目
      num: 0,
      //评论的该观点的信息
      info: [],
      //关注信息
      attentionmsg: "",
      //写评论
      val: "",
    };
  },
  methods:{
    back() {
      //点击返回
      this.$router.back(-1);
    },
    //点击关注发送axios请求
    attention(id) {
      if (!this.uid) {
        // 未登录跳转到登录
        this.$router.push("/login");
        return;
      }
      //       被关注者的id  当前用户的id
      Attention(id, this.uid).then((res) => {
        //如果是0就是已取消关注
        //如果是1就是已关注
        if (res == 1) {
          this.attentionmsg = "已关注";
        } else {
          this.attentionmsg = "关注";
        }
      });
    },
    //点击书籍跳转
    toDetails(id) {
      this.$router.push("/bookdetail/" + id);
    },
    //点击发送评论
    send() {
      if (!this.uid) {
        this.$router.push("/login");
        return;
      }
      //发送内容不能为空
      if (!this.val.trim()) {
        this.$toast("发送内容不能为空");
        return;
      }
      Send(this.bookdata.vid, this.val, this.uid).then((res) => {
        if (res == 1) {
          //    发送成功之后就将val设置Wie空
          this.val = "";
          //插入成功 在发送一次请求
          bookviewdetails(this.$route.params.vid).then((res) => {
            if (res != 0) {
              //如果响应结果不等于0将结果保存在info中
              this.info = res;
              this.num = res.length; //并且将长度添加到num中
            } else {
              this.num = res;
            }
          });
        }
      });
    },
  },
  created() {
    (async () => {
      await this.token();
      //加载组件时发送查询该观点信息
      BookView(this.$route.params.vid).then((res) => {
        //将返回来的对象的图片变成数组
        if (res.imgs) {
          res.imgs = res.imgs.split(",");
        }
        this.bookdata = res;
        //  console.log(this.bookdata)
        //加载组件时查询该用户是否关注
        isAttention(this.bookdata.uid, this.uid).then((res) => {
          //返回1就说明已关注
          //返回0就说明没有关注
          // console.log(res)
          this.attentionmsg = res.msg;
        });
      });
    })();

    //加载组件时该观点评论信息
    bookviewdetails(this.$route.params.vid).then((res) => {
      if (res != 0) {
        //如果响应结果不等于0将结果保存在info中
        this.info = res;
        this.num = res.length; //并且将长度添加到num中
      } else {
        this.num = res;
      }
    });
  },
};
</script>
<style>
/* 头部信息 */
#excerpt #excerpt-head {
  display: flex;
  width: 100%;
  height: 60px;
  position: fixed;
  top: 0;
  align-items: center;
  background-color: white;
}
#excerpt #excerpt-head .iconfanhui {
  font-size: 24px;
  margin-left: 10px;
}
#excerpt #excerpt-head > div:last-child {
  position: absolute;
  left: calc(50% - 50px);
  font-size: 20px;
}
#Details {
  width: 90%;
  margin: 60px auto;
}
/* 页脚评论 */
#footerView {
  width: 100%;
  height: 60px;
  /* margin:0 auto; */
  background-color: white;
  display: flex;
  position: fixed;
  bottom: 0;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid black;
}
#footerView > input {
  width: 80%;
  height: 40px;
  border-radius: 25px;
  padding-left: 15px;
  font-size: 14px;
  background-color: rgb(197, 197, 197);
}
#footerView > input::placeholder {
  color: gray;
}
#footerView .iconfasong {
  font-size: 24px;
}
/* 个人头像显示以及昵称 */
#excerpt-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#excerpt-header > div:first-child {
  display: flex;
  align-items: center;
}
#excerpt-header > div:first-child #nickname {
  margin-left: 10px;
}
#excerpt-header > div:last-child {
  width: 60px;
  text-align: center;
  padding: 5px 0;
  background-color: #743481;
  color: white;
  border-radius: 20px;
}
#excerpt-header img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
}
/* 有内边距的评论 */
#excerpt-padding {
  /* width:100%; */
  height: 300px;
  background: #c46ad6;
  margin: 10px 0;
  padding: 20px 20px;
  border-radius: 5px;
  color: white;
  letter-spacing: 3px;
  font-size: 20px;
  font-family: "宋体";
}
/* 书籍 */
#excerpt-book {
  display: flex;
  /* width:100%; */
  background-color: rgb(230, 230, 230);
  padding: 10px 0 10px 5px;
  border-radius: 5px;
}
#excerpt-book img {
  width: 40px;
  height: 60px;
}
#excerpt-book > div {
  margin-left: 10px;
}
#excerpt-book > div > h2 {
  margin-top: 10px;
}
/* 全部评论 */
#excerpt-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
  color: gray;
}

/* 该观点的评论 */
/* 书评 */
#excerpt-err > img {
  width: 100%;
}
.excerpt {
  display: flex;
  margin-top: 15px;
}
.excerpt-users {
  display: flex;
  margin-top: 15px;
}
.excerpt-users img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.excerpt-info {
  margin-left: 10px;
  border-bottom: 1px solid gray;
  padding-bottom: 3px;
  width: 80%;
}
.excerpt-info > h2 {
  color: #743481;
  font-size: 14px;
  margin-top: 5px;
}
.excerpt-info > p {
  font-size: 14px;
  line-height: 20px;
  margin-top: 10px;
}
.excerpt-info i {
  display: inline-block;
  margin-top: 10px;
  color: gray;
}
#images::after {
  content: "";
  display: block;
  clear: both;
}
/* 图片 */
#images img {
  width: 30%;
  /* float:left; */
  margin: 0 5px;
}
</style>