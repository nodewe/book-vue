import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store"
import Priv from '../components/Priv.vue';//用户服务协议
import Reg from '../components/Reg.vue';//用户注册
import Login from '../components/Login.vue';//用户登录
import Person from '../pages/Person.vue';//个人中心
import Read from '../pages/Read.vue';//读书模块
import Discover from '../pages/Discover.vue';//发现模块
import Home from '../pages/Home.vue';//主页模块
import Cloudbook from '../pages/Cloudbook.vue';//云书馆模块
import Feedback from '../pages/Feedback.vue';//意见反馈模块
import Friend from '../pages/Friend.vue';//邀请好友模块
import MyColl from '../pages/MyColl.vue';//我的收藏
import MyNote from '../pages/MyNote.vue';//我的笔记
import MyCreation from '../pages/MyCreation.vue';//我的创作
import SET from '../pages/Set.vue';//个人中心的设置页面
import Search from '../pages/Search.vue';//个人中心的设置页面
import BookDetail from '../pages/BookDetail.vue';//书籍的详情页
import Excerpt from '../pages/Excerpt.vue';//书籍的详情页
import Update from '../pages/Update.vue';//修改头像
import SearchList from '../pages/SearchList.vue';//搜索结果页面
import Allreview from '../pages/Allreview.vue';//全部评论的详情页
import Write from '../pages/Write.vue';//全部评论的详情页
import Viewpoint from '../pages/Viewpoint.vue';//全部评论的详情页
import SelectedSeacrch from '../pages/SelectedSeacrch.vue';//观点详情之选择书籍页面
import readPage from '../pages/readPage.vue';//阅读书籍的页面
import accountInfo from '../pages/accountInfo';//账户信息详情
import setUpwd from '../pages/setUpwd';//设置密码详情页
// import Updatehome from "../pages/home1"

Vue.use(VueRouter)
 const routes = [
  { path:"/person",component:Person},//个人中心
  { path:"/set",component:SET},//个人中心的设置页面
  { path: '/Priv',component: Priv},//用户隐私页面
  { path:"/login",component:Login},//登录
  {path:"/reg",component:Reg},//注册
  {path:"/index",component:Home},//首页index的首页
  {path:"/",component:Home},//斜杆的首页
  {path:"/discover",component:Discover},//发现页面
  {path:"/read",component:Read},//阅读页面
  {path:"/cloudBook",component:Cloudbook,meta:{isLogin:true}},//我的云书馆
  {path:"/feedback",component:Feedback,meta:{isLogin:true}},//意见反馈
  {path:"/myColl",component:MyColl,meta:{isLogin:true}},//我的收藏
  {path:"/myNote",component:MyNote,meta:{isLogin:true}},//我的笔记
  {path:"/myCreation",component:MyCreation,meta:{isLogin:true}},//我的创作
  {path:"/friend",component:Friend,meta:{isLogin:true}},//邀请好友
  {path:"/search",component:Search},//搜索框页面
  {path:"/bookdetail/:bid",component:BookDetail},//书籍的详情页路由
  {path:"/excerpt/:vid",component:Excerpt},//观点的详情页
  {path:"/update",component:Update},//修改头像
  {path:"/searchlist/:bookname",component:SearchList},//书摘的详情页
  {path:"/allreview/:bid",component:Allreview},//全部评论详情页
  {path:"/write/:bid",component:Write},//撰写书评页面
  {path:"/viewpoint",component:Viewpoint},//撰写书评页面
  {path:"/selectedseacrch",component:SelectedSeacrch},//观点详情之选择书籍页面
  {path:"/readPage/:bid",component:readPage},//观点详情之选择书籍页面
  {path:"/accountinfo",component:accountInfo},//设置账户详情页路由字典
  {path:"/setupwd",component:setUpwd},//设置密码详情页路由字典
  // {
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../pages/About.vue')
  // }
]

const router = new VueRouter({

  routes
})
//设置路由守卫
router.beforeEach((to,form,next)=>{
 
  if(to.meta.isLogin){//如果该路由需要做登录判断的话
     if(!store.state.uid){//未登录的情况下
         router.push("/login?redirect="+to.fullPath)
     }else{
       next()
     }
  }else{
    next()
  }
})
export default router
