<template>
  <div id="Home">
    <!-- 顶部的导航 -->
    <div class="top-header">
      <div>
        <h2 :class="{active:active==0}" @click="index(0)">最新</h2>
        <h2 :class="{active:active==1}" @click="index(1)">推荐</h2>
        <h2 :class="{active:active==2}" @click="index(2)">关注</h2>
      </div>
      <router-link to="/search?redirect=/" class="iconfont iconsousuo"></router-link>
    </div>
    <!--  -->
    <div id="updatecontent">
      <van-swipe
        :show-indicators="false"
        :loop="false"
        :initial-swipe="active"
        @change="onChange"
        :width="innerWidth"
      >
        <!-- 最新开始 -->
        <van-swipe-item>
          <!-- 下拉刷新组件 -->
          <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
            <div @click="toView(item.vid)" v-for="item,i of newdata" class="temp">
              <div class="person">
                <p>
                  <img :src="`${url}/avatar/${item.avatar}`" alt />
                </p>
                <i v-text="item.nickname"></i>
              </div>
              <!-- 评论 -->
              <p class="reivew" v-text="item.viewcontent"></p>
              <!-- 图片 -->
              <p v-show="item.imgs" class="imgs">
                <img
                  v-for="itemImg,index in item.imgs"
                  :key="index"
                  :src="`${url}/usersimage/${item.imgs[index]}`"
                />
              </p>
              <!-- 书详情页的路径 -->
              <div @click="toBookDetails($event,item.bid)" class="book">
                <img :src="`${url}/coverimage/${item.coverimage}`" alt />
                <div>
                  <h1 v-text="item.bookname"></h1>
                  <i v-text="item.author"></i>
                </div>
              </div>
              <!-- 下面的信息 -->
              <!-- 时间 -->
              <p class="date">{{ item.date|mydate }}</p>
            </div>
          </van-pull-refresh>
        </van-swipe-item>
        <!-- 最新结束 -->
        <!-- 推荐开始 -->
        <van-swipe-item>
          <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
            <!-- 循环生每一个介绍 -->
            <div @click="toView(item.vid)" v-for="item,i of tuijian" class="temp">
              <div class="person">
                <p>
                  <img v-lazy="`${url}/avatar/${item.avatar}`" alt />
                </p>
                <i v-text="item.nickname"></i>
              </div>
              <!-- 评论 -->
              <p class="reivew" v-text="item.viewcontent"></p>
              <!-- 图片 -->
              <p v-show="item.imgs" class="imgs">
                <!-- 图片的循环生成 -->
                <img
                  v-for="itemImg,index of item.imgs"
                  :key="index"
                  v-lazy="`${url}/usersimage/${itemImg}`"
                />
              </p>
              <!-- 书详情页的路径 -->
              <div @click="toBookDetails($event,item.bid)" class="book">
                <img v-lazy="`${url}/coverimage/${item.coverimage}`" alt />
                <div>
                  <h1 v-text="item.bookname"></h1>
                  <i v-text="item.author"></i>
                </div>
              </div>
              <!-- 下面的信息 -->
              <!-- 时间 -->
              <p class="date">{{ item.date|mydate }}</p>
            </div>
            <!-- 每一个循环完毕 -->
          </van-pull-refresh>
        </van-swipe-item>
        <!-- 推荐结束 -->
        <!-- 关注开始 -->
        <van-swipe-item>
          <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
            <!-- swiper每一项 -->
            <div v-if="guanzhu">
              <div @click="toView(item.vid)" v-for="item,i of guanzhu" class="temp">
                <div class="person">
                  <p>
                    <img :src="`${url}/avatar/${item.avatar}`" />
                  </p>
                  <i v-text="item.nickname"></i>
                </div>
                <!-- 评论 -->
                <p class="reivew" v-text="item.viewcontent"></p>
                <!-- 书详情页的路径 -->
                <div @click="toBookDetails($event,item.bid)" class="book">
                  <img :src="`${url}/coverimage/${item.coverimage}`" alt />
                  <div>
                    <h1 v-text="item.bookname"></h1>
                    <i v-text="item.author"></i>
                  </div>
                </div>
                <!-- 下面的信息 -->
                <!-- 时间 -->
                <p class="date">{{ item.date|mydate }}</p>
              </div>
            </div>
            <div v-else id="att">
              <img :src="`${url}/att.png`" alt />
            </div>
            <div id="noLogin" v-show="!uid">
              <!-- 如果没有登录就显示 -->
              <router-link to="/login">
                <img src="imgs/noLogin.png" alt />
              </router-link>
            </div>
          </van-pull-refresh>
        </van-swipe-item>
        <!-- 关注结束 -->
      </van-swipe>
    </div>
    <!-- 全局组件 -->
    <my-tabbar></my-tabbar>
  </div>
</template>
<script>
import { viewPoint } from "../assets/js/apis/book";
import { Attentionlist } from "../assets/js/apis/user";
import { baseURL } from "../assets/js/apis/url";
import { mapState } from "vuex";


// import {Swiper,SwiperSlide,directive} from "vue-awesome-swiper"
// import 'swiper/css/swiper.css'
// import 'swiper/swiper-bundle.css'
export default {
  // components:{
  //   Swiper,
  //   SwiperSlide
  // },
  computed: {
    ...mapState(["uid"]),
  },
  data() {
    return {
      active: 1,
      newdata: [],
      url: baseURL,
      tuijian: [],
      guanzhu: [],
      //是否处于加载状态
      isLoading: true,
      //节流的变量
      throttl: true,
      // 文档宽度
      innerWidth:window.innerWidth
    };
  },
  methods: {
    index(i) {
      this.active = i;
      //     this.$ref('swiper').swipeTo({
      //   index:i
      // })
    },
    onChange(i) {
      this.active = i;
      //    console.log(i)
    },
    //点击进入观点详情页
    toView(id) {
      this.$router.push(`/excerpt/${id}`);
    },
    //进入书籍详情页
    toBookDetails(e, id) {
      e.stopPropagation();
      this.$router.push(`/bookdetail/${id}`);
    },
    load() {
      //如果active小于2就说明点击的是最新或者推荐
      if (this.active < 2) {
        viewPoint().then((res) => {
          let temparr = [];
          res.forEach((item) => {
            // console.log(item)
            if (item.imgs) {
              item.imgs = item.imgs.split(",");
              //console.log(item.imgs)
            }
            temparr.push(item);
          });
          this.tuijian = temparr;
          //console.log(this.tuijian)
          // console.log(res)
          //  点击的最新
          if (this.active == 0) {
            this.newdata = temparr.sort((a, b) => b.date - a.date);
          }
          //最新就是将数据中日期进行排序排序后的
          this.isLoading = false;
          //  节流 当请求结果回来之后 在可以进行下一次请求
          this.throttl = true;
        });
      } else {
        if (!this.uid) {
            this.isLoading=false
          return;
        } //判断是否是登录状态
        Attentionlist(this.uid).then((res) => {
          //将返回数据保存
          //console.log(res)
          if (res != 0) {
            let temparr = [];
            res.forEach((item) => {
              if (item.imgs) {
                item.imgs = item.imgs.split(",");
              }
              temparr.push(item);
            });
            this.guanzhu = temparr; //如果找到了这个数据就将此给关注的数组
            this.isLoading = false; //将load值成false
            this.throttl = true; //请求结果返回之后才能进行下一次请求
          } else {
            this.guanzhu = res;
          }
        });
      }
    },
    //下来刷新
    onRefresh() {
      if (this.throttl) {
        this.throttl = false;
        this.load();
      }
    },
  },
  created() {
    //创建阶段加载请求token 解析出来
    this.token();
    this.load();
   window.addEventListener("resize",()=>{
     this.innerWidth=window.innerWidth
     console.log(this.innerWidth)
     this.$forceUpdate()
   })
  },
  watch: {
    active() {
      //如果active小于2就说明点击的是最新或者推荐
      this.load();
    }
  },
};
</script>
<style>
#Home .top-header {
  position: fixed;
  top: 0;
  z-index: 100;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  height: 60px;
  box-shadow: 0 3px 10px 0 black;
}
#Home .iconsousuo {
  margin-right: 5%;
  font-size: 24px;
  color: #743481;
}
#updatecontent {
  margin-top: 60px;
}
#Home .top-header > div {
  display: flex;
  width: 40%;
  font-family: "宋体";
  /* font-size:20px; */
  justify-content: space-evenly;
  align-items: baseline;
}
#Home .active {
  font-size: 24px;
  color: #743481;
  font-weight: bold;

  padding-bottom: 2px;
  border-bottom: 2px solid #743481;
}

/* 循环模板 */
#Home .temp::before {
  content: "";
  display: table;
}
#Home .temp {
  width: 95%;
  /* border:1px solid red; */
  margin: 0 auto;
  margin-top: 0px;
  border-radius: 5px;
  box-shadow: 1px 0 5px 2px gray;
  padding-bottom: 10px;
  margin-bottom: 10px;
}
#Home .person {
  display: flex;
  width: 95%;
  margin: 0 auto;
  margin-top: 10px;
  align-items: center;
}
#Home .person > p {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  overflow: hidden;
  /* margin-left:20px; */
}
#Home .person img {
  width: 35px;
  height: 35px;
}
#Home .person i {
  font-size: 14px;
  margin-left: 10px;
}
/* 评论 */
#Home .reivew {
  width: 95%;
  margin: 0 auto;
  margin-top: 10px;
  max-height: 60px;
  line-height: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
}
#Home .book {
  display: flex;
  width: 95%;
  align-items: center;
  margin: 0 auto;
  margin-top: 10px;
  background-color: rgb(233, 233, 233);
  border-radius: 3px;
}
#Home .book > img {
  width: 40px;
  height: 50px;
}
#Home .book > div {
  margin-left: 10px;
}
#Home .book h1 {
  font-size: 18px;
}
#Home .book i {
  display: inline-block;
  font-size: 12px;
  color: gray;
  margin-top: 5px;
}
#Home .date {
  width: 95%;
  margin: 0 auto;
  margin-top: 10px;
  color: gray;
}
#att > img {
  width: 100%;
}
/* 设置图片的样式 */
#Home .imgs {
  width: 100%;
}
#Home .imgs::after {
  content: "";
  display: block;
  clear: both;
}
#Home .imgs > img {
  width: 30%;
  height: 130px;
  margin: 5px 5px;
  float: left;
}
#Home #noLogin img {
  width: 100%;
  max-height:100vh;
}
#Home .van-pull-refresh__track {
  max-height: 100vh;
}
#Home .van-swipe__track {
  width: 100% !important;
}
 /* #Home .van-swipe-item{ */
   /* width:100vh !important; */
  /* min-height:100vh !important; */
/* } */
</style>