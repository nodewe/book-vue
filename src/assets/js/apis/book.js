//导入url地址
import { baseURL } from "./url"
//导入axios
import axios from "axios"
// axios.interceptors.request.use(config=>{

// })
//封装一个根据书籍名称获取书籍的函数
function bookName(name){
    return new Promise(
        function(resolve){
            axios.get(baseURL+"/book/bookName/"+name).then(res=>{
                resolve(res.data)
            })
        }
    )
}
//封装一个根据id值查找书籍的详情
function bookDetails(id){
    return new Promise(
        function(resolve){
            axios.get(baseURL+"/book/bookDetails/"+id).then(res=>{
                resolve(res.data)
            })
        }
    )
}
//封装一个根据当前书籍id查找当前书籍相关评论
function bookreview(bid){
    return new Promise(
        function(resolve){
            axios.get(baseURL+"/book/bookreview/"+bid).then(res=>{
                resolve(res.data)
            })
        }
    )
}
//撰写评论点击发送的的函数
function Send(bid,uid,val){
    return new Promise(
        function(resolve){
            let date=+new Date()
            let data=`bid=${bid}&uid=${uid}&review=${val}&date=${date}`
            axios.post(baseURL+"/book/send",data).then(res=>{
                resolve(res.data)
            })
        }
    )
}
//发布 书籍观点的函数
function Issue(formdata){
    return new Promise(
        function(resolve){
            let date=+new Date()
           /// let data=`bid=${bid}&uid=${uid}&viewcontent=${val}&date=${date}`
            axios.post(baseURL+"/book/issue",formdata).then(res=>{
                resolve(res.data)
            })
        }
    )
}
//查观点数据表
function viewPoint(){
    return new Promise(
        function(resolve){
            axios.get(baseURL+"/book/viewpoint").then(res=>{
                resolve(res.data)
            })
        }
    )
}
//点击首页的每一项进去之后根据vid的值去找相关评论和书籍信息
function BookView(id){
    return new Promise(
        function(resolve){
            axios.get(baseURL+"/book/bookview/"+id).then(res=>{
                resolve(res.data)
            })
        }
    )
}
//查找该观点的评论信息
function bookviewdetails(id){
    return new Promise(
        function(resolve){
            axios.get(baseURL+"/book/info/"+id).then(res=>{
                resolve(res.data)
            })
        }
    )
}
//随便看看查找书籍
function see(){
    return new Promise(
        function(resolve){
            axios.get(baseURL+"/book/see").then(res=>{
                resolve(res.data)
            })
        }
    )
}
//导出
export {
    bookName,
    bookDetails,
    bookreview,
    Send,
    Issue,
    viewPoint,
    BookView,
    bookviewdetails,
    see
}